export const useStrapiOrderRepository = () => {
  const client = useStrapiClient()

  const validateDeliveryDate = async (orderId: number, deliveryDate: string): Promise<boolean> => {
    return await client('/orders/validateDeliveryDate', { method: 'POST', body: { deliveryDate, orderId } })
  }

  return {
    validateDeliveryDate,
  }
}
