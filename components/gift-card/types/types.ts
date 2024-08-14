export type GiftCardForm = {
  amount: number
  quantity: number
  message: string
  whoSend: string
  forWho: string
  sendMethod: string
  designId: number
}

export type BillingForm = {
  name: string
  surname: string
  nif: string
  email: string
  address1: string
  address2: string
  postalCode: string
  city: string
  state: string
  country: string
}
