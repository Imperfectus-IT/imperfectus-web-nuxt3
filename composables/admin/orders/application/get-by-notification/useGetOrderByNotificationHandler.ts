import type { ComposerTranslation } from 'vue-i18n'

export const useGetOrderByNotificationHandler = (t: ComposerTranslation) => {
  const { executeGetOrderByNotification, orders } = useGetOrderByNotification(t)

  onMounted(async () => {
    await executeGetOrderByNotification()
  })

  return {
    orders,
    executeGetOrderByNotification,
  }
}
