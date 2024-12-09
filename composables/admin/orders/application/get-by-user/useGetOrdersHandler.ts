export const useGetOrdersHandler = () => {
  const { executeGetOrdersByUser, orders } = useGetOrders()

  onMounted(async () => {
    try {
      await executeGetOrdersByUser()
    }
    catch (error) {
      console.error('useGetOrdersHandler onMounted error:', error)
    }
  })

  return {
    orders,
    executeGetOrdersByUser,
  }
}
