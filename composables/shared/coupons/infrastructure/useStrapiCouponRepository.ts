export const useStrapiCouponRepository = () => {
  const { find } = useStrapi()
  const client = useStrapiClient()
  const find = async (query: CouponQuery): Promise<CouponResponse[]> => {
    return await find<CouponResponse[]>('coupons', query)
  }
  const getReferredCoupons = async () => {
    const response: unknown[] = await client('/coupons/referred')
    return response.map((coupon: unknown) => useCouponFactory(coupon))
  }
  return {
    find,
    getReferredCoupons,
  }
}
