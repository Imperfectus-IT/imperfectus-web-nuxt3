import type { Ref } from 'vue'

export const useDeliveryState = () => {
  const deliveryDate: Ref<string> = useState('deliveryDate', () => '')
  const deliveryHour: Ref<string> = useState('deliveryHour', () => '')

  return {
    deliveryDate,
    deliveryHour,
  }
}
