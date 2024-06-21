import type { DonationPayload } from '../types/DonationPayload'
import type { Periodicity } from '~/components/admin/my-subscriptions/types/Periodicity.ts'
import type { Subscription } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

export const useUpdateSubscription = () => {
  const { subscriptions } = useSubscriptionsState()
  const { donateToONG, findSubscriptionsByUser, updateSubscriptionPeriodicity } = useSubscriptionRepository()

  const executeDonateToONG = async (body: DonationPayload) => {
    await donateToONG(body)
    subscriptions.value = await findSubscriptionsByUser()
  }

  const executeUpdatePeriodicity = async (subscription: Subscription, periodicity: Periodicity) => {
    return await updateSubscriptionPeriodicity(subscription, periodicity)
  }

  return {
    executeDonateToONG,
    executeUpdatePeriodicity,
    subscriptions,
  }
}
