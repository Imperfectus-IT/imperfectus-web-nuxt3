import type { ComposerTranslation } from 'vue-i18n'
import type { createOrderItemReviewPayload } from '~/components/admin/my-orders/DesktopOrder.vue'

export const useCreateOrderItemReview = (t: ComposerTranslation) => {
  const { createOrderItemReview, findOrdersByUser } = useOrderRepository(t)
  const { orders } = useOrdersState()

  const executeCreateOrderItemReview = async (newReview: createOrderItemReviewPayload) => {
    await createOrderItemReview(newReview)
    orders.value = await findOrdersByUser()
  }

  return {
    executeCreateOrderItemReview,
  }
}
