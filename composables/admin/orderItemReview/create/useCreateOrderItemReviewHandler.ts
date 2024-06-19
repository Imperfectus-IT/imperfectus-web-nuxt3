import type { ReviewRatings } from '~/components/admin/my-orders/partials/types/ReviewRatings.ts'

export const useCreateOrderItemReviewHandler = () => {
  const { executeCreateOrderItemReview } = useCreateOrderItemReview()

  const handleCreateReview = async (newReview: ReviewRatings, orderItemId: number) => {
    try {
      return await executeCreateOrderItemReview(newReview, orderItemId)
    }
    catch (error) {
      console.log('Error creating review', error)
    }
  }

  return {
    handleCreateReview,
  }
}
