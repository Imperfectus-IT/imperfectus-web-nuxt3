import {
  useGetReferredCoupons,
} from '~/composables/shared/coupons/application/get-referred-coupons/useGetReferredCoupons.ts'

export const useGetReferredCouponsHandler = () => {
  const { executeGetReferredCoupons } = useGetReferredCoupons()
  const coupons = reactive({
    usedCoupons: [] as Coupon[],
    unusedCoupons: [] as Coupon[],
  })
  onMounted(async () => {
    const referredCoupons = await executeGetReferredCoupons()
    coupons.usedCoupons = referredCoupons.usedCoupons
    coupons.unusedCoupons = referredCoupons.unusedCoupons
  })

  return {
    coupons,
  }
}
