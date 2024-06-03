export const useUpdateSubscriptionHandler = () => {
  const { executeDonateToONG } = useUpdateSubscription();
  return {
    executeDonateToONG
  };
}