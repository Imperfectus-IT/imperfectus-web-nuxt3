export const useStrapiUserCouponRepository = () => {
  const find = async (query: UserCouponQuery): Promise<UserCouponResponse[]> => {
    const { find } = useStrapi()
    return await find<UserCouponResponse[]>('coupon-users', query)
  }
  return {
    find,
  }
}
