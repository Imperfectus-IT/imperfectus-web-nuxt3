export const useCouponFactory = (coupon: any): Coupon => {
  return {
    coupon: coupon.coupon,
    descriptionCa: coupon.description_ca,
    descriptionEs: coupon.description_es,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    expire: coupon.expire,
    id: coupon.id,
    isActive: coupon.isActive,
    pendingUses: coupon.pendingUses,
    type: coupon.type,
  }
}
