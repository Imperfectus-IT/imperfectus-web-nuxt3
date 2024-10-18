import type { StrapiCoupon } from '~/composables/shared/coupons/infrastructure/types/StrapiCoupon.ts'

export const useStrapiCouponFactory = (coupon: Coupon): StrapiCoupon => {
  return {
    id: coupon.id,
    coupon: coupon.coupon,
    description_ca: coupon.descriptionCa,
    description_es: coupon.descriptionEs,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    expire: coupon.expire,
    isActive: coupon.isActive,
    type: coupon,
  }
}
