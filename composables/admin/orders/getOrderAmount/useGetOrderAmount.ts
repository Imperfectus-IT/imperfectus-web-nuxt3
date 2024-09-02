export const useGetOrderAmount = () => {
  const executeGetOrderAmount = async (payload: TotalOrderAmountQuery): Promise<any> => {
    const { getAmount } = useOrderRepository()
    return await getAmount(payload)
  }
  return {
    executeGetOrderAmount,
  }
}
