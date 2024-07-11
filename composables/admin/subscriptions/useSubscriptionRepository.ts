import type { DonationPayload } from './types/DonationPayload'
import type { Subscription, SubscriptionBilling, SubscriptionShipping } from './types/SubscriptionTypes'
import type { SubscriptionTotal } from '~/components/admin/my-subscriptions/partials/SubscriptionDetails.vue'
import type { Periodicity } from '~/components/admin/my-subscriptions/types/Periodicity.ts'
import type {
  updateSubscriptionItemPayload,
} from '~/components/admin/my-subscriptions/partials/SubscriptionModifyItem.vue'
import type { addItemPayload } from '~/components/admin/my-subscriptions/partials/SubscriptionAddItem.vue'
import type { PauseSubscriptionPayload } from '~/components/admin/my-subscriptions/partials/SubscriptionPauseModal.vue'
import type { CancelSubscriptionPayload } from '~/components/admin/my-subscriptions/partials/SubscriptionCancelModal.vue'
import {
  useStrapiSubscriptionBillingFactory,
} from '~/composables/admin/subscriptions/factories/useStrapiSubscriptionBillingFactory.ts'

export const useSubscriptionRepository = () => {
  const config = useRuntimeConfig()
  const { update, find, create } = useStrapi()
  const client = useStrapiClient()

  const addSubscriptionCoupon = async (subscriptionId: number, coupon: string) => {
    return await client<Subscription>(`/subscriptions/${subscriptionId}/coupon`, { method: 'PUT', body: { coupon } })
  }
  const addSubscriptionItem = async (newSubscriptionItem: addItemPayload, subscriptionId: number) => {
    const { boxProduct, exclusions } = newSubscriptionItem
    const { amount, weight, id } = boxProduct
    const body = {
      subscription: subscriptionId,
      product: id,
      exclusions,
      amount,
      weight,
      quantity: 1,
      status: 'active',
    }
    return await create('subscription-items', body)
  }
  const cancelDonation = async (subscriptionId: number, date: string) => {
    return await client(`/subscriptions/${subscriptionId}/removeDonationOrGift`, { method: 'POST', body: { date } })
  }
  const cancelSubscription = async (subscriptionId: number, cancelSubscriptionData: CancelSubscriptionPayload): Promise<Subscription> => {
    return await client(`/subscriptions/${subscriptionId}/cancel`, {
      method: 'PUT',
      body: cancelSubscriptionData,
    })
  }
  const donateToONG = async (body: DonationPayload): Promise<Subscription> => {
    const { subscriptionId } = body
    return await client<Subscription>(`/subscriptions/${subscriptionId}/giveOrder`, {
      method: 'POST', body: {
        purpose: body.purpose,
        givenTo: body.givenTo,
        date: body.paymentDate,
        newSubscriptionMeta: body.newSubscriptionMeta,
        deliveryDate: body.deliveryDate,
      },
    })
  }
  const findSubscriptionsByUser = async (): Promise<Subscription[]> => {
    const user = useStrapiUser()
    const strapiSubscriptions = await find('subscriptions', { user: user.value?.id, _sort: 'created_at:desc' })
    return strapiSubscriptions.map((subscription: any) => useDomainSubscriptionFactory(subscription))
  }
  const getSubscriptionTotal = async (subscription: Subscription): Promise<SubscriptionTotal> => {
    return await $fetch(`${config.public.STRAPI_URL}/orders/total`, {
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
  const giveOrderToFriend = async (giveOrderToFriendData: DonationPayload): Promise<void> => {
    const { subscriptionId } = giveOrderToFriendData
    const response = await client(`/subscriptions/${subscriptionId}/giveOrder`, { method: 'POST', body: giveOrderToFriendData })
    console.log('response', response)
  }
  const pauseSubscription = async (pauseSubscriptionData: PauseSubscriptionPayload, subscriptionId: number): Promise<Subscription> => {
    return await client<Subscription>(`/subscriptions/${subscriptionId}/pauseSubscription`, {
      method: 'PUT', body: pauseSubscriptionData,
    })
  }
  const removeSkip = async (subscriptionId: number, skip: string[]) => {
    const response = await update('subscriptions', subscriptionId, { skip })
    console.log('response', response)
    return response
  }
  const removeSubscriptionCoupon = async (subscriptionId: number) => {
    return await update('subscriptions', subscriptionId, { coupon: null })
  }
  const skipAnOrder = async (subscriptionId: number, skip: string[]) => {
    return update('subscriptions', subscriptionId, { skip })
  }
  const updateShippingMeta = async (metaId: number, newShippingMeta: SubscriptionShipping) => {
    const strapiShippingMeta = useStrapiSubscriptionShippingFactory(newShippingMeta)
    return await client(`/subscription-metas/${metaId}/shipping`, {
      method: 'PUT',
      body: { meta: strapiShippingMeta },
    })
  }
  const unpauseSubscription = async (subscriptionId: number): Promise<Subscription> => {
    return await client(`/subscriptions/${subscriptionId}/unpauseSubscription`, { method: 'PUT' })
  }
  const updateSubscriptionBillingMeta = async (metaId: number, newBillingMeta: SubscriptionBilling) => {
    const strapiBillingMeta = useStrapiSubscriptionBillingFactory(newBillingMeta)
    return await client(`/subscription-metas/${metaId}/billing`, {
      method: 'PUT',
      body: { meta: strapiBillingMeta },
    })
  }
  const updateSubscriptionItem = async (updateSubscriptionItemData: updateSubscriptionItemPayload) => {
    const { subscriptionItemId, newBoxProduct, exclusions } = updateSubscriptionItemData
    const { amount, weight } = newBoxProduct
    return await update('subscription-items', subscriptionItemId, { subscriptionItemId, product: newBoxProduct.id, exclusions, amount, weight })
  }
  const updateSubscriptionPeriodicity = async (subscription: Subscription, periodicity: Periodicity) => {
    const { preferredDay, preferredHour, frequency } = periodicity
    await update('subscriptions', subscription.id, { preferredDay, preferredHour, frequency })
  }
  const updateSubscriptionPayment = async (subscription: Subscription, paymentId: number) => await update('subscriptions', subscription.id, { payment: paymentId })

  return {
    addSubscriptionCoupon,
    addSubscriptionItem,
    cancelDonation,
    cancelSubscription,
    donateToONG,
    findSubscriptionsByUser,
    getSubscriptionTotal,
    giveOrderToFriend,
    pauseSubscription,
    removeSkip,
    removeSubscriptionCoupon,
    skipAnOrder,
    unpauseSubscription,
    updateSubscriptionPeriodicity,
    updateSubscriptionPayment,
    updateSubscriptionBillingMeta,
    updateSubscriptionItem,
    updateShippingMeta,
  }
}
