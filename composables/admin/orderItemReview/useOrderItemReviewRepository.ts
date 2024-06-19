import type { ReviewRatings } from '~/components/admin/my-orders/partials/types/ReviewRatings.ts'

export const useReviewRepository = () => {
  const createReview = async (newReview: ReviewRatings, orderItemId: number) => {
    const { create } = useStrapi()
    return await create('order-item-reviews', {
      order_item: orderItemId,
      ratings: newReview,
    })
  }

  return {
    createReview,
  }
}
