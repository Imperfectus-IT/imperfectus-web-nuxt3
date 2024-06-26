import type { ComposerTranslation } from 'vue-i18n'
import type { Order } from '~/composables/admin/orders/types/OrderType.ts'

export const useUpdateOrderHandler = (t: ComposerTranslation) => {
  const { executeUpdateOrder } = useUpdateOrder(t)

  const handleUpdateOrder = async (order: Order, review: string) => {
    return await executeUpdateOrder(order, review)
  }

  return {
    handleUpdateOrder,
  }
}
