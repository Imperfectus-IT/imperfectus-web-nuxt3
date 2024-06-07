export const useGiftCard = () => {
  const { giftCard } = useGiftCardState()
  const { create } = useGiftCardRepository()

  const executeCreateGiftCard = async () => {
    // await create(giftCard.value)
  }

  return {
    executeCreateGiftCard,
    giftCard,
  }
}
