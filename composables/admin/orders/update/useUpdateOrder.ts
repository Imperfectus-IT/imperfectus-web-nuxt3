export const useUpdateOrder = () => {
  const { updateOrder } = useOrderRepository()
  const executeUpdateOrder = async (orderId: string, order: Order) => {
    await updateOrder(orderId, order)
  }
  return {
    executeUpdateOrder,
  }
}
