export const useUpdateDeliveryHandler = () => {
  const { deliveryDate, deliveryHour } = useDeliveryState()
  const { executeUpdateDelivery } = useUpdateDelivery()

  const executeUpdateDeliveryHandler = async (orderId: number, deliveryDate: string, deliveryHour?: string): Promise<void> => {
    await executeUpdateDelivery(orderId, deliveryDate, deliveryHour)
  }

  return {
    deliveryDate,
    deliveryHour,
    executeUpdateDeliveryHandler,
  }
}
