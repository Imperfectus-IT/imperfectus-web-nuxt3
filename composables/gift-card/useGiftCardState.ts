// import { v4 } from 'uuid'
import type { Ref } from 'vue'

export const giftCardCreator = () => {
  return {
    // id: v4(),
    amount: 21.07,
    designId: 1,
    forWho: '',
    message: '',
    sendMethod: '',
    whoSend: '',
    quantity: 1,
  }
}

export const useGiftCardState = () => {
  const giftCard: Ref<GiftCard[]> = useState('giftcard', () => [giftCardCreator()])
  return {
    giftCard,
  }
}

export type GiftCard = {
  // id: string
  designId: number
  amount: number
  forWho: string
  message: string
  sendMethod: string
  whoSend: string
  quantity: number
}
