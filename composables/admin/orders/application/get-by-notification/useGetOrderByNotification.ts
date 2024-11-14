export const useGetOrderByNotification = () => {
  const { order } = useOrdersState()
  const { findByNotification } = useOrderRepository()

  const executeGetOrderByNotification = async (notification: string) => {
    order.value = await findByNotification(notification)
  }

  return {
    executeGetOrderByNotification,
    order,
  }
}
