export const useStrapiCouponRepository = () => {
    const find = async (query: CouponQuery): Promise<CouponResponse[]> => {
        const { find } = useStrapi()
        return await find<CouponResponse[]>('coupons', query)
    }
    return {
        find,
    }
}
