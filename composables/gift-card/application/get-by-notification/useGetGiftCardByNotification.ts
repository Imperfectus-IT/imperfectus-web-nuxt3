export const useGetGiftCardByNotification = () => {
  const { getGiftCardByNotification } = useGiftCardRepository()
  const { giftCards } = useGiftCardPurchaseState()

  const executeGetGiftCardByNotification = async (notification: string) => {
    giftCards.value = await getGiftCardByNotification(notification)
  }
  return {
    executeGetGiftCardByNotification,
    giftCards,
  }
}
