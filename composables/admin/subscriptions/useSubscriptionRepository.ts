export const useSubscriptionRepository = () => {
  const findSubscriptionsByUser = async (): Promise<Subscription[]> => {
    const { find } = useStrapi();
    const user = useStrapiUser();
    const strapiSubscriptions = await find('subscriptions', { user: user.value?.id, _sort: 'created_at:desc' })
    const subscriptions: Subscription[] = strapiSubscriptions.map((subscription: any) => useSubscriptionFactory(subscription))
    return subscriptions
  }

  return {
    findSubscriptionsByUser
  }
};