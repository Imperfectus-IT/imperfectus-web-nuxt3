import type { Subscription } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'
import type { SubscriptionTotal } from '~/components/admin/my-subscriptions/partials/SubscriptionDetails.vue'

export const useGetSubscriptionTotal = () => {
  const { getSubscriptionTotal } = useSubscriptionRepository()
  const executeGetSubscriptionTotal = async (subscription: Subscription): Promise<SubscriptionTotal> => {
    return await getSubscriptionTotal(subscription)
  }
  return {
    executeGetSubscriptionTotal,
  }
}
