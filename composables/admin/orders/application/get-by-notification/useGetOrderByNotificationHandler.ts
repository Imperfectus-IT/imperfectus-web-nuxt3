import type { ComposerTranslation } from 'vue-i18n'

export const useGetOrderByNotificationHandler = (notification: string) => {
  const { executeGetOrderByNotification, order } = useGetOrderByNotification()

  onMounted(async () => {
    await executeGetOrderByNotification(notification)
  })

  return {
    order,
    executeGetOrderByNotification,
  }
}
