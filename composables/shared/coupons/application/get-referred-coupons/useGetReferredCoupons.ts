export const useGetReferredCoupons = () => {
  const { getReferredCoupons } = useStrapiCouponRepository()

  const executeGetReferredCoupons = async () => {
    const coupons = await getReferredCoupons()

    const usedCoupons = coupons.filter((coupon: Coupon) => coupon.pendingUses === 0)
    const unusedCoupons = coupons.filter((coupon: Coupon) => coupon.pendingUses > 0)
    return {
      usedCoupons,
      unusedCoupons,
    }
  }
  return {
    executeGetReferredCoupons,
  }
}
