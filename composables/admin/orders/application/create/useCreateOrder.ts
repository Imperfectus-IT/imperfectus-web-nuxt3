import { useOrdersState } from '~/composables/admin/orders/application/useOrdesState.ts'
import { useOrderRepository } from '~/composables/admin/orders/infrastructure/useOrderRepository.ts'

export const useCreateOrder = () => {
  const { order } = useOrdersState()
  const { createOrder } = useOrderRepository()

  const executeCreateOrder = async (cart: ShoppingCart) => {
    await createOrder(cart)
  }
  return {
    executeCreateOrder,
  }
}
