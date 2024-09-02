export const useFindUserCoupon = () => {
  const executeFindUserCoupon = async (query: UserCouponQuery): Promise<UserCouponResponse[]> => {
    const { find } = useStrapiUserCouponRepository()
    return await find(query)
  }
  return {
    executeFindUserCoupon,
  }
}
