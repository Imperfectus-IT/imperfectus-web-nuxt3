export type StrapiPurchase = {
  order_meta: StrapiOrderMeta
  deliveryDate: string
  deliveryHour: string
  preferredDay: string
  preferredHour: string | null
  user: number
  talkualLegalBasis: string
  marketingInfoComm: boolean
  whatsappInfoComm: boolean
  notes: string
  via: string
  order_items: StrapiPurchaseItem[]
}

type StrapiPurchaseItem = {
  product: number
  quantity: number
  frequency: string
  amount: number
  exclusions: number[]
  coupon_id: Coupon | null
  weight: number
}
