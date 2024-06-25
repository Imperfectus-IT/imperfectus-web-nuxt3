import type { ComposerTranslation } from 'vue-i18n'
import type { Order } from '~/composables/admin/orders/types/OrderType.ts'

export const useUpdateOrder = (t: ComposerTranslation) => {
  const { updateOrder, findOrdersByUser } = useOrderRepository(t)
  const { orders } = useOrdersState()

  const executeUpdateOrder = async (order: Order, review: string) => {
    await updateOrder(order, review)
    orders.value = await findOrdersByUser()
  }
  return {
    executeUpdateOrder,
  }
}
