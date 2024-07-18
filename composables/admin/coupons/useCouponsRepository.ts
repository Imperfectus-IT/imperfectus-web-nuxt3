export const useCouponsRepository = () => {
  const client = useStrapiClient()
  const getReferredCoupons = async () => {
    const response: unknown[] = await client('/coupons/referred')
    return response.map((coupon: unknown) => useCouponDomainFactory(coupon))
  }
  return {
    getReferredCoupons,
  }
}
