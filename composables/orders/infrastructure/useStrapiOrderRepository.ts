export const useStrapiOrderRepository = () => {
  const client = useStrapiClient()

  const validateDeliveryDate = async (orderId: number, deliveryDate: string): Promise<boolean> => {
    return await client('/orders/validateDeliveryDate', { method: 'POST', body: { deliveryDate, orderId } })
  }

  const updateDelivery = async (orderId: number, deliveryDate: string, deliveryHour?: string): Promise<void> => {
    if (deliveryHour === 'full') {
      deliveryHour = null
    }
    const response = await client(`/orders/${orderId}/deliveryDate`, { method: 'PUT', body: { deliveryDate, deliveryHour } })
    return {
      deliveryDate: response.delivery.deliveryDate,
      deliveryHour: response.delivery.deliveryHour,
    }
  }

  return {
    validateDeliveryDate,
    updateDelivery,
  }
}
