export const useGiftCardState = () => {
  const giftCard: Ref<GiftCard> = useState('gift-card', () => ({
    amount: 0,
    designId: 0,
    receiver: '',
    message: '',
    email: '',
    sender: '',
    code: '',
  }))

  return {
    giftCard,
  }
}

export type GiftCard = {
  amount: number // Amount
  designId: number // DesignId
  receiver: string // forWho
  message: string // message
  email: string // sendMethod
  sender: string // WhoSend
  code: string // Code
}
