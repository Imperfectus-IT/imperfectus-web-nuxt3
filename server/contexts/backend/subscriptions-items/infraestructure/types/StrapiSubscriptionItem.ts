import type { BoxProductType, ItemProductType } from '~/server/contexts/backend/products/domain/types/ProductTypes'
import type { Coupon } from '~/server/contexts/backend/coupons/domain/Coupon'

export interface StrapiSubscriptionItem {
  id: number
  quantity: number
  subscription: number
  product: BoxProductType
  status: string
  amount: number
  weight: number
  notes: string
  coupon: Coupon
  exclusions: ItemProductType[] | []
}
