import type { ComposerTranslation } from 'vue-i18n'
import type { Order } from '~/composables/admin/orders/types/OrderType.ts'
import { useOrdersFactory } from '~/composables/admin/orders/useOrdersFactory.ts'

export const useOrderRepository = (t: ComposerTranslation) => {
  const findOrderByOrderId = async (order_id: number): Promise<Order> => {
    const { find } = useStrapi()
    const results = await find<Array<Order>>('orders', { order_id })
    if (!results[0]) {
      throw new Error('Order not found')
    }
    return useOrdersFactory(results[0], t)
  }

  return {
    findOrderByOrderId,
  }
}
