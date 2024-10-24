import { useStrapiOrderRepository } from '~/composables/orders/infrastructure/useStrapiOrderRepository.ts'

export const useValidateDeliveryDate = () => {
  const { isValidDeliveryDate } = useValidateDeliveryDateState()
  const { validateDeliveryDate } = useStrapiOrderRepository()

  const executeValidateDeliveryDate = async (orderId: number, deliveryDate: string): Promise<void> => {
    isValidDeliveryDate.value = await validateDeliveryDate(orderId, deliveryDate)
  }

  return {
    executeValidateDeliveryDate,
    isValidDeliveryDate,
  }
}
