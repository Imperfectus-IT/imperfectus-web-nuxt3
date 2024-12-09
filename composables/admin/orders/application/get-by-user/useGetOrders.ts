export const useGetOrders = () => {
  const { orders } = useOrdersState()
  const { findOrdersByUser } = useOrderRepository()

  const executeGetOrdersByUser = async () => {
    orders.value = await findOrdersByUser()
  }

  return {
    executeGetOrdersByUser,
    orders,
  }
}
