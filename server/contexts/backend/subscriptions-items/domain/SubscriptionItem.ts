import type { BoxProductType, ItemProductType } from '~/server/contexts/backend/products/domain/types/ProductTypes'
import type { Coupon } from '~/server/contexts/backend/coupons/domain/Coupon'

export class SubscriptionItem {
  constructor(
    public readonly id: number,
    public readonly quantity: number,
    public readonly amount: number,
    public readonly exclusions: ItemProductType[] | [],
    public readonly image: string | string[],
    public readonly product: BoxProductType,
    public readonly weight: number,
    public readonly coupon: Coupon,
  ) {
  }
}
