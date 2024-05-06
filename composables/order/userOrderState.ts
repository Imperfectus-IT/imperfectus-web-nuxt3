import type { Order } from '~/composables/admin/orders/types/OrderType.ts'

export const userOrderState = () => {
  const order: Ref<Order | null> = useState('orders', () => null)

  return {
    order,
  }
}
