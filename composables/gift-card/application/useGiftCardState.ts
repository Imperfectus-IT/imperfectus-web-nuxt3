// import { v4 } from 'uuid'
import type { Ref } from 'vue'
import { createEmptyPurchase } from '../domain/GiftCard.ts'

export const giftCardPurchaseCreator = () => {
  return createEmptyPurchase()
}

export const useGiftCardPurchaseState = () => {
  const giftCardPurchase: Ref<GiftCardPurchase> = useState('giftCardPurchase', () => giftCardPurchaseCreator())
  const giftCards: Ref<GiftCard[]> = useState('giftCard', () => [])

  return {
    giftCardPurchase,
    giftCards,
  }
}
