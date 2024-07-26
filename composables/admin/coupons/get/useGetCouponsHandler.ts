import { useGetCoupons } from '~/composables/admin/coupons/get/useGetCoupons.ts'
import type { Coupon } from '~/composables/admin/coupons/types/Coupon.ts'

export const useGetCouponsHandler = () => {
  const { executeGetReferredCoupons } = useGetCoupons()
  const coupons = reactive({
    usedCoupons: [] as Coupon[],
    unusedCoupons: [] as Coupon[],
  })
  onMounted(async () => {
    const fetchedCoupons = await executeGetReferredCoupons()
    coupons.usedCoupons = fetchedCoupons.usedCoupons
    coupons.unusedCoupons = fetchedCoupons.unusedCoupons
  })

  return {
    coupons,
  }
}
