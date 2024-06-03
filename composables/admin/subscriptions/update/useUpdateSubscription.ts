import type { DonationPayload } from "../types/DonationPayload";

export const useUpdateSubscription = () => {
  const { subscriptions } = useSubscriptionsState();
  const { donateToONG, findSubscriptionsByUser } = useSubscriptionRepository();

  const executeDonateToONG = async (body: DonationPayload) => {
    await donateToONG(body);
    subscriptions.value = await findSubscriptionsByUser();
  }

  return {
    executeDonateToONG,
    subscriptions
  }
}