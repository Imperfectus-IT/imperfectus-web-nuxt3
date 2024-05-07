export const useGetSubscriptionsHandler = () => {
  const { executeGetSubscriptionsByUser, subscriptions } = useGetSubscriptions();

  onMounted(async () => {
    await executeGetSubscriptionsByUser()
  })

  return {
    subscriptions
  }
}