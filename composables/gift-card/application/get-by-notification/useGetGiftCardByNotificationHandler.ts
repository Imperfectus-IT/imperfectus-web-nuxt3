export const useGetGiftCardByNotificationHandler = (notification?: string) => {
  const { executeGetGiftCardByNotification, giftCards } = useGetGiftCardByNotification()

  onMounted(async () => {
    if (notification) {
      await executeGetGiftCardByNotification(notification)
    }
  })

  return {
    giftCards,
    executeGetGiftCardByNotification,
  }
}
