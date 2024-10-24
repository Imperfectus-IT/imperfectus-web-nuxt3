import { useValidateDeliveryDate } from '~/composables/orders/application/validate-delivery-date/useValidateDeliveryDate'

export const useValidateDeliveryDateHandler = () => {
  const { isValidDeliveryDate, executeValidateDeliveryDate } = useValidateDeliveryDate()

  return {
    validateDeliveryDate: executeValidateDeliveryDate,
    isValidDeliveryDate,
  }
}
