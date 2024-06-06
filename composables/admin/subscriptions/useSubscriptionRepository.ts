import type { DonationPayload } from './types/DonationPayload'
import type { Subscription } from './types/SubscriptionTypes'

export const useSubscriptionRepository = () => {
  const findSubscriptionsByUser = async (): Promise<Subscription[]> => {
    const { find } = useStrapi()
    const user = useStrapiUser()
    const strapiSubscriptions = await find('subscriptions', { user: user.value?.id, _sort: 'created_at:desc' })
    const subscriptions: Subscription[] = strapiSubscriptions.map((subscription: any) => useSubscriptionFactory(subscription))
    return subscriptions
  }
  const donateToONG = async (body: DonationPayload) => {
    const { subscriptionId } = body
    const client = useStrapiClient()
    await client<Subscription>(`/subscriptions/${subscriptionId}/giveOrder`, { method: 'POST', body: {
      purpose: body.purpose,
      givenTo: body.givenTo,
      date: body.paymentDate,
      newSubscriptionMeta: body.newSubscriptionMeta,
      deliveryDate: body.deliveryDate,
    } })
  }
  return {
    findSubscriptionsByUser,
    donateToONG,
  }
}
