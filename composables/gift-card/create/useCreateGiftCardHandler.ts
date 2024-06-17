export const useCreateGiftCardHandler = () => {
  const { giftCard, executeCreateGiftCard, executeAddGiftCard, executeRemoveGiftCard } = useGiftCard()

  return {
    giftCard,
    executeCreateGiftCard,
    addGiftCard: executeAddGiftCard,
    removeGiftCard: executeRemoveGiftCard
  }
}
