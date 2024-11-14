export const useCreateGiftCardHandler = () => {
  const { giftCardPurchase } = useGiftCard()

  return {
    giftCardPurchase,
  }
}
