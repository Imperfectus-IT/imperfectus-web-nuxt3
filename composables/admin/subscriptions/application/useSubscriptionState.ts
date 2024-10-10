export const useSubscriptionsState = () => {
  const subscriptions: Ref<Subscription[]> = useState('subscriptions', () => [])
  return {
    subscriptions,
  }
}
