import { useBackendSubscriptionRepository } from '~/composables/admin/subscriptions/useBackendSubscriptionRepository.ts'

export const useGetSubscriptions = () => {
  const { subscriptions } = useSubscriptionsState()
  const { findSubscriptionsByUser } = useSubscriptionRepository()
  // const { findSubscriptionsByUser } = useBackendSubscriptionRepository();

  const executeGetSubscriptionsByUser = async () => {
    try {
      subscriptions.value = await findSubscriptionsByUser()
      console.log('Subscriptions', subscriptions.value)
    }
    catch (e) {
      console.log('Error', e)
    }
  }

  return {
    executeGetSubscriptionsByUser,
    subscriptions,
  }
}
