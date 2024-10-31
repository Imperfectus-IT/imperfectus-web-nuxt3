export type StrapiPurchase = {
  order_meta: StrapiOrderMeta
  deliveryDate: string
  deliveryHour: string
  preferredDay: string
  preferredHour: string | null
  user: StrapiUser
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
  frequency: string | null
  amount: number
  exclusions: number[]
  coupon: number | null
  weight: number
  tax_id: number
}
