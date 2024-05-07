export const useGetSubscriptions = () => {
  const { subscriptions } = useSubscriptionsState()
  const { findSubscriptionsByUser } = useSubscriptionRepository()

  const executeGetSubscriptionsByUser = async () => {
    subscriptions.value = await findSubscriptionsByUser()
  }

  return {
    executeGetSubscriptionsByUser,
    subscriptions,
  }
}
