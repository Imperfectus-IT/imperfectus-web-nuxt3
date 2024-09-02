export type CouponQuery = {
  coupon: string
}

export type ValidCouponResponse = {
  id: number
  expire: any
  limit: any
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
  maxOrdersPerUser: number
  hasActiveSubscription: any
  users: any[]
  locations: any[]
  products: any[]
}

export type CouponResponse = ValidCouponResponse | []

export type Coupon = Partial<CouponResponse>

export type UserCouponQuery = {
  user: number
  coupon: number
}

export type ValidUserCouponResponse = {
  id: number
  user: number
  coupon: number
  times_used: number
  created_at: string
  updated_at: string
}

export type UserCoupon = Partial<ValidUserCouponResponse>

export type UserCouponResponse = ValidUserCouponResponse | []
