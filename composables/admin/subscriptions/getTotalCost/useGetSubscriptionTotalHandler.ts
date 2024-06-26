import type { SubscriptionTotal } from '~/components/admin/my-subscriptions/partials/SubscriptionDetails.vue'
import type { Subscription } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

export const useGetSubscriptionTotalHandler = () => {
  const { executeGetSubscriptionTotal } = useGetSubscriptionTotal()
  const handleGetSubscriptionTotal = async (subscription: Subscription): Promise<SubscriptionTotal> => {
    return await executeGetSubscriptionTotal(subscription)
  }
  return {
    handleGetSubscriptionTotal,
  }
}
