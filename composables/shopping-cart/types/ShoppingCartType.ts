export type BillingAddress = {
  firstname: string
  lastname: string
  email: string
  phone: string
  company: string
  address1: string
  address2: string
  postalCode: string
  city: string
  state: string
  cif: string
  country: string
}

export type ShippingAddress = {
  firstname: string
  lastname: string
  email: string
  phone: string
  company: string
  address1: string
  address2: string
  postalCode: string
  city: string
  state: string
  country: string
  notes: string
}

export type BoxProductDetail = {
  id: number
  sku: string
  name: string
  description: string
  price: string
  image?: string
  exclusions?: []
}

export type Item = {
  id: string
  amount: number
  exclusions: StrapiProduct[]
  image: string
  boxProduct: BoxProductDetail | null
  boxType: string
  boxSize: string
  purchaseType: string
  frequency?: string
  quantity: number
}

export type MessageStatus = ERROR_MESSAGE_STATUS | SUCCESS_MESSAGE_STATUS | null

export type ValidationMessage = {
  status: MessageStatus
  message: string | null
}

export type ShoppingCart = {
  status: string
  step: string
  deliveryDate: string
  deliveryHour: string
  preferredDay: string
  preferredHour: string
  invoiceRequired: boolean
  coverage?: string | null
  coupon?: any
  items: Item[]
  currentItem: Item | null
  termConditions: boolean
  whatsappInfo: boolean
  marketingInfo: boolean
  billingAddress: BillingAddress
  shippingAddress: ShippingAddress
}
