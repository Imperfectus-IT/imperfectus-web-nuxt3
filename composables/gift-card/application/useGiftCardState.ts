// import { v4 } from 'uuid'
import type { Ref } from 'vue'
import { createEmpty as createEmptyGiftCard } from '../domain/GiftCard.ts'

export const giftCardCreator = () => {
  return createEmptyGiftCard()
}

export const useGiftCardState = () => {
  const giftCardPurchase: Ref<GiftCardPurchase> = useState('giftCardPurchase', () => giftCardCreator())
  return {
    giftCardPurchase,
  }
}
