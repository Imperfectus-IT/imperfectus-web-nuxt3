export const useGetOrderAmount = () => {
  const executeGetOrderAmount = async (payload: GetAmountPayload): Promise<any> => {
    const { getAmount } = useOrderRepository()
    return await getAmount(payload)
  }
  return {
    executeGetOrderAmount,
  }
}
