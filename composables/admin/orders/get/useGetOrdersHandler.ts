export const useGetOrdersHandler = (t:any) => {
  const { executeGetOrdersByUser, orders } = useGetOrders(t);

  onMounted(async () => {
    await executeGetOrdersByUser();
  })

  return {
    orders
  }
}