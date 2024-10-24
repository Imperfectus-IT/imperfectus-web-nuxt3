import type { Ref } from 'vue'

export const useValidateDeliveryDateState = () => {
  const isValidDeliveryDate: Ref<boolean> = useState('isValidDeliveryDate', () => false)

  return {
    isValidDeliveryDate,
  }
}
