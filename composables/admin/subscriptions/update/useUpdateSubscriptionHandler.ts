import type { Periodicity } from '~/components/admin/my-subscriptions/types/Periodicity.ts'
import type { Subscription } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

export const useUpdateSubscriptionHandler = () => {
  const { executeDonateToONG, executeUpdatePeriodicity } = useUpdateSubscription()

  const updatePeriodicity = async (subscription: Subscription, periodicity: Periodicity) => {
    await executeUpdatePeriodicity(subscription, periodicity)
  }

  return {
    executeDonateToONG,
    updatePeriodicity,
  }
}
