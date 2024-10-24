import { useCreateOrder } from '~/composables/admin/orders/application/create/useCreateOrder.ts'

export const useCreatePurchase = () => {
  const { executeCreateOrder } = useCreateOrder()

  const createPurchase = async (shoppingCart: ShoppingCart) => {
    await executeCreateOrder(shoppingCart)
  }

  return {
    createPurchase,
  }
}
