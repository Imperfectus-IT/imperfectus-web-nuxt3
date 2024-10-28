export const useFindCoupon = () => {
  const executeFindCoupon = async (query: CouponQuery): Promise<CouponResponse[]> => {
    const { findCoupon } = useStrapiCouponRepository()
    return await findCoupon(query)
  }
  return {
    executeFindCoupon,
  }
}
