export const useCreateGiftCard = () => {
  const { giftCardPurchase } = useGiftCardPurchaseState()
  const { createGiftCard } = useGiftCardRepository()
  const { order } = useOrdersState()

  const executeCreateGiftCard = async () => {
    const response = await createGiftCard(giftCardPurchase.value)
    if (response) {
      order.value = response.order as Order
    }
  }

  return {
    executeCreateGiftCard,
    giftCardPurchase,
  }
}
