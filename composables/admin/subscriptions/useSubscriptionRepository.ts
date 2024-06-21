import type { DonationPayload } from './types/DonationPayload'
import type { Subscription } from './types/SubscriptionTypes'
import type { SubscriptionTotal } from '~/components/admin/my-subscriptions/partials/SubscriptionDetails.vue'
import type { Periodicity } from '~/components/admin/my-subscriptions/types/Periodicity.ts'

export const useSubscriptionRepository = () => {
  const findSubscriptionsByUser = async (): Promise<Subscription[]> => {
    const { find } = useStrapi()
    const user = useStrapiUser()
    const strapiSubscriptions = await find('subscriptions', { user: user.value?.id, _sort: 'created_at:desc' })
    return strapiSubscriptions.map((subscription: any) => useSubscriptionFactory(subscription))
  }

  const updateSubscriptionPeriodicity = async (subscription: Subscription, periodicity: Periodicity) => {
    const { update } = useStrapi()
    console.log('updateSubscriptionPeriodicity', subscription, periodicity)
    const { preferredDay, preferredHour, frequency } = periodicity
    subscription = { ...subscription, preferredDay, preferredHour, frequency }
    const test = await update('subscriptions', subscription.id, subscription)
    console.log('test', test)
  }

  const getSubscriptionTotal = async (subscription: Subscription): Promise<SubscriptionTotal> => {
    return await $fetch('http://localhost:3000/orders/total', {
      method: 'POST',
      body: {
        items: [...subscription.subscriptionItems],
        coupon: subscription.coupon,
        delivery: {
          shipping_supplements: [],
        },
        isPlaced: true,
      },
    })
  }

  const donateToONG = async (body: DonationPayload) => {
    const { subscriptionId } = body
    const client = useStrapiClient()
    await client<Subscription>(`/subscriptions/${subscriptionId}/giveOrder`, {
      method: 'POST', body: {
        purpose: body.purpose,
        givenTo: body.givenTo,
        date: body.paymentDate,
        newSubscriptionMeta: body.newSubscriptionMeta,
        deliveryDate: body.deliveryDate,
      },
    })
  }
  return {
    findSubscriptionsByUser,
    donateToONG,
    getSubscriptionTotal,
    updateSubscriptionPeriodicity,
  }
}
