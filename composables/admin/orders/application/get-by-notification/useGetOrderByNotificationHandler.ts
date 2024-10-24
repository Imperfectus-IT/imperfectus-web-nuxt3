import type { ComposerTranslation } from 'vue-i18n'

export const useGetOrderByNotificationHandler = (notification: string, t: ComposerTranslation) => {
  const { executeGetOrderByNotification, order } = useGetOrderByNotification(t)

  onMounted(async () => {
    await executeGetOrderByNotification(notification)
  })

  return {
    order,
    executeGetOrderByNotification,
  }
}
