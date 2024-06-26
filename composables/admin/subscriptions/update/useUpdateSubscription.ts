import type { DonationPayload } from '../types/DonationPayload'
import type { Periodicity } from '~/components/admin/my-subscriptions/types/Periodicity.ts'
import type { Subscription, SubscriptionBilling } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

export const useUpdateSubscription = () => {
  const { subscriptions } = useSubscriptionsState()
  const { donateToONG, findSubscriptionsByUser, updateSubscriptionPeriodicity, updateSubscriptionPayment, updateSubscriptionBillingMeta } = useSubscriptionRepository()

  const executeDonateToONG = async (body: DonationPayload) => {
    await donateToONG(body)
    subscriptions.value = await findSubscriptionsByUser()
  }

  const executeUpdatePeriodicity = async (subscription: Subscription, periodicity: Periodicity) => {
    return await updateSubscriptionPeriodicity(subscription, periodicity)
  }

  const executeUpdatePayment = async (subscription: Subscription, paymentId: number) => {
    return await updateSubscriptionPayment(subscription, paymentId)
  }

  const executeUpdateBillingMeta = async (metaId: number, newBillingMeta: SubscriptionBilling) => {
    return await updateSubscriptionBillingMeta(metaId, newBillingMeta)
  }

  return {
    executeDonateToONG,
    executeUpdatePeriodicity,
    executeUpdatePayment,
    executeUpdateBillingMeta,
    subscriptions,
  }
}
