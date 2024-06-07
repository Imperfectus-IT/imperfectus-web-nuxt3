export const useCreateGiftCardHandler = () => {
  const { giftCard, executeCreateGiftCard } = useGiftCard()

  return {
    giftCard,
    executeCreateGiftCard
  }
}
