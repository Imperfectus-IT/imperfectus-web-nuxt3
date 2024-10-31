export const useStrapiCouponRepository = () => {
  const { find } = useStrapi()
  const client = useStrapiClient()
  const findCoupon = async (query: CouponQuery): Promise<CouponResponse[]> => {
    const strapiCoupon = (await find<CouponResponse[]>('coupons', { coupon: query }))[0]
    return useCouponFactory(strapiCoupon)
  }
  const getReferredCoupons = async () => {
    const response: unknown[] = await client('/coupons/referred')
    return response.map((coupon: unknown) => useCouponFactory(coupon))
  }

  const validateCoupon = async (validateCouponData: ValidateCouponPayload): Promise<Coupon | null> => {
    const response = await client('/coupons/validate', {
      method: 'POST',
      body: {
        ...validateCouponData,
        coupon: { coupon: validateCouponData.coupon },
      },
    })
    return response.foundCoupon ? useCouponFactory(response.foundCoupon) : null
  }
  return {
    findCoupon,
    getReferredCoupons,
    validateCoupon,
  }
}
