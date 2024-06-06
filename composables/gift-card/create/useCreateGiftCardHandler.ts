export const useGiftCardHandler = () => {
  const { giftCard } = useGiftCard()

  return {
    giftCard,
  }
}
