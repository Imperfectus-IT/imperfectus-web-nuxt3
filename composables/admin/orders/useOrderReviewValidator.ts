import type { Order } from '~/composables/admin/orders/types/OrderType.ts'

export const useOrderReviewValidator = () => {
  const isValidForReview = (order: Order) => {
    return order.status === 'completed'
  }

  return {
    isValidForReview,
  }
}
