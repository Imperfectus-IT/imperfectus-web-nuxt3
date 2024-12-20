import type { PublicReview } from '~/composables/public-reviews/domain/types.ts'

export const usePublicReviewsFactory = (review: any): PublicReview => {
  return {
    author: review.authorName,
    imageUrl: review.authorPhoto,
    rating: review.rating,
    text: review.text,
    relativeTime: review.relativeTime,

  }
}
