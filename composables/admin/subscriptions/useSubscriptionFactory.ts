export const useSubscriptionFactory = (subscription: any): Subscription => {
  return {
    id: subscription.id,
    status: subscription.status,
    frequency: subscription.frequency,
    subscriptionItems: [],
    skip: [],
  }
}
