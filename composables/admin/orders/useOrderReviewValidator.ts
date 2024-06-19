import type { Order } from '~/composables/admin/orders/types/OrderType.ts'

export const useOrderReviewValidator = () => {
  const isValidForReview = (order: Order) => {
    if (order.status !== 'completed') {
      return false
    }
    else {
      return true
    }
  }

  return {
    isValidForReview,
  }
}
