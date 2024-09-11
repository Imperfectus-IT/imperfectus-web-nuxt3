import { usePublicReviewsRepository } from '~/composables/public-reviews/usePublicReviewsRepository.ts'
import { usePublicReviewsState } from '~/composables/public-reviews/usePublicReviewsState.ts'

export const useFindPublicReviews = () => {
  const { findPublicReviews } = usePublicReviewsRepository()
  const { reviews } = usePublicReviewsState()
  const executeFindPublicReviews = async () => {
    reviews.value = await findPublicReviews()
  }

  return {
    executeFindPublicReviews,
  }
}
