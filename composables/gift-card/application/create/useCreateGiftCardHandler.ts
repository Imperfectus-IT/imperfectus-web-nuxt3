import { useCreateGiftCard } from '~/composables/gift-card/application/create/useCreateGiftCard.ts'

export const useCreateGiftCardHandler = () => {
  const { giftCardPurchase, executeCreateGiftCard } = useCreateGiftCard()

  return {
    giftCardPurchase,
    executeCreateGiftCard,
  }
}
