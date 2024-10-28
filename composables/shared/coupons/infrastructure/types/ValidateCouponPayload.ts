export type ValidateCouponPayload = {
  user: StrapiUser
  coupon: string
  postcode: string
  items: string[] // SKU list
}
