import type { createOrderItemReviewPayload } from '~/components/admin/my-orders/DesktopOrder.vue'

export const useReviewRepository = () => {
  const createReview = async (newReview: createOrderItemReviewPayload) => {
    const { newRatings, orderItemId } = newReview
    const { create } = useStrapi()
    return await create('order-item-reviews', {
      order_item: orderItemId,
      ratings: newRatings,
    })
  }

  return {
    createReview,
  }
}
