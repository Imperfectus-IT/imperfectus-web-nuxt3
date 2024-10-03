export type StrapiCoupon = {
  id: number
  expire: string
  limit: number | null
  discountValue: number
  discountType: string
  coupon: string
  type: string
  created_at: string
  updated_at: string
  description_es: string
  description_ca: string
  isActive: boolean
  userEligibility: string
  onlyFirstPurchase: boolean
  maxOrdersPerUser: number | null
  hasActiveSubscription: boolean
}
