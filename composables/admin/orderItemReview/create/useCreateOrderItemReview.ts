import type { ComposerTranslation } from 'vue-i18n'
import type { createOrderItemReviewPayload } from '~/components/admin/my-orders/DesktopOrder.vue'

export const useCreateOrderItemReview = (t: ComposerTranslation) => {
  const { createReview } = useReviewRepository()
  const { orders } = useOrdersState()
  const { findOrdersByUser } = useOrderRepository(t)

  const executeCreateOrderItemReview = async (newReview: createOrderItemReviewPayload) => {
    await createReview(newReview)
    orders.value = await findOrdersByUser()
  }

  return {
    executeCreateOrderItemReview,
  }
}
