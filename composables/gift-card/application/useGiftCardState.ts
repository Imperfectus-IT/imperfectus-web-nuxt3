// import { v4 } from 'uuid'
import type { Ref } from 'vue'
import { createEmptyPurchase, createEmptyGiftCard } from '../domain/GiftCard.ts'

export const giftCardPurchaseCreator = () => {
  return createEmptyPurchase()
}

export const useGiftCardPurchaseState = () => {
  const giftCardPurchase: Ref<GiftCardPurchase> = useState('giftCardPurchase', () => giftCardPurchaseCreator())
  const giftCard: Ref<GiftCard> = useState('giftCard', () => createEmptyGiftCard())

  return {
    giftCardPurchase,
    giftCard,
  }
}
