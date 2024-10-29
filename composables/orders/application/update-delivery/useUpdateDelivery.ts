export const useUpdateDelivery = () => {
  const { deliveryDate, deliveryHour } = useDeliveryState()
  const { updateDelivery } = useStrapiOrderRepository()

  const executeUpdateDelivery = async (orderId: number, date: string, hour?: string): Promise<void> => {
    const result = await updateDelivery(orderId, date, hour)
    deliveryDate.value = result.deliveryDate
    deliveryHour.value = result.deliveryHour
  }

  return {
    deliveryDate,
    deliveryHour,
    executeUpdateDelivery,
  }
}
