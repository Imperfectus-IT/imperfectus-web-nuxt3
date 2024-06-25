import type { Periodicity } from '~/components/admin/my-subscriptions/types/Periodicity.ts'
import type { Subscription, SubscriptionBilling } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

export const useUpdateSubscriptionHandler = () => {
  const { executeDonateToONG, executeUpdatePeriodicity, executeUpdatePayment, executeUpdateBillingMeta } = useUpdateSubscription()

  const updatePeriodicity = async (subscription: Subscription, periodicity: Periodicity) => {
    await executeUpdatePeriodicity(subscription, periodicity)
  }

  const updatePayment = async (subscription: Subscription, paymentId: number) => {
    return await executeUpdatePayment(subscription, paymentId)
  }

  const updateBillingMeta = async (metaId: number, newBillingMeta: SubscriptionBilling) => {
    return await executeUpdateBillingMeta(metaId, newBillingMeta)
  }

  return {
    executeDonateToONG,
    updatePeriodicity,
    updatePayment,
    updateBillingMeta,
  }
}
