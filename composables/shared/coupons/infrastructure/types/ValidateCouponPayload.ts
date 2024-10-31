export type ValidateCouponPayload = {
  user: StrapiUser
  coupon: string
  postcode: string
  items: { product: number }[]
}
