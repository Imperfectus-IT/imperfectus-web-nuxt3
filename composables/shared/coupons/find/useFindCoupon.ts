export const useFindCoupon = () => {
    const executeFindCoupon = async (query: CouponQuery): Promise<CouponResponse[]> => {
        const { find } = useStrapiCouponRepository()
        return await find(query)
    }
    return {
        executeFindCoupon,
    }
}
