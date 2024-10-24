import type { ComposerTranslation } from 'vue-i18n'

export const useGetOrderByNotification = (t: ComposerTranslation) => {
  const { order } = useOrdersState()
  const { findByNotification } = useOrderRepository()

  const executeGetOrderByNotification = async (notification: string) => {
    order.value = await findByNotification(notification, t)
  }

  return {
    executeGetOrderByNotification,
    order,
  }
}
