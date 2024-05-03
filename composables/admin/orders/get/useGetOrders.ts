export const useGetOrders = (t: any) => {
  const { orders } = useOrdersState()
  const { findOrdersByUser } = useOrderRepository(t)

  const executeGetOrdersByUser = async () => {
    orders.value = await findOrdersByUser()
  }

  return {
    executeGetOrdersByUser,
    orders,
  }
}
