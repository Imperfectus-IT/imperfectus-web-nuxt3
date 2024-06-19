import type { ReviewRatings } from '~/components/admin/my-orders/partials/types/ReviewRatings.ts'

export const useCreateOrderItemReview = () => {
  const { createReview } = useReviewRepository()

  const executeCreateOrderItemReview = async (newReview: ReviewRatings, orderItemId: number) => {
    return await createReview(newReview, orderItemId)
  }

  return {
    executeCreateOrderItemReview,
  }
}
