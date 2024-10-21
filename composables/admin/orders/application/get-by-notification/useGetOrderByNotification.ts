import type { ComposerTranslation } from 'vue-i18n'

export const useGetOrderByNotification = (t: ComposerTranslation) => {
  const { orders } = useOrdersState()
  const { findByNotification } = useOrderRepository(t)

  const executeGetOrderByNotification = async (notification: string) => {
    console.log('ORDERS!', orders)
    orders.value = await findByNotification(notification)
  }

  return {
    executeGetOrderByNotification,
    order,
  }
}
