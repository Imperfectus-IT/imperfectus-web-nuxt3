import type { Ref } from 'vue'
import type { PublicReview } from '~/composables/public-reviews/domain/types.ts'

export const usePublicReviewsState = () => {
  const reviews: Ref<PublicReview[]> = useState('public-reviews', () => [])
  return {
    reviews,
  }
}
