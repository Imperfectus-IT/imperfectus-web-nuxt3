import { v4 as uuidv4 } from 'uuid'

export type GiftCardPurchase = {
  items: GiftCard[]
  currentItem: GiftCard
  billing: OrderBilling
}

export type GiftCard = {
  id?: number
  uuid?: string
  designId: number
  amount: number
  forWho: string
  message: string
  sendMethod: string
  whoSend: string
  quantity: number
}

export const createEmpty = (): GiftCardPurchase => {
  return {
    items: [],
    currentItem: createEmptyGiftCardItem(),
    billing: createEmptyBilling(),
  }
}

const createEmptyGiftCardItem = (): GiftCardItem => {
  return {
    uuid: uuidv4(),
    designId: 1,
    amount: 21.07,
    forWho: '',
    message: '',
    sendMethod: '',
    whoSend: '',
    quantity: 1,
  }
}

const createEmptyBilling = (): OrderBilling => {
  return {
    billingFirstName: '',
    billingLastName: '',
    billingEmail: '',
    billingPhone: '',
    billingAddress: '',
    billingAddress2: '',
    billingPostCode: '',
    billingCity: '',
    billingState: '',
    billingCif: '',
    billingCountry: '',
    billingCompany: '',
    billingSocialName: '',
  }
}
