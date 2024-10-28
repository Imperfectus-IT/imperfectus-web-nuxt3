export const useValidateCoupon = () => {
  const { validateCoupon } = useStrapiCouponRepository()
  const { shoppingCart } = useShoppingCartState()
  const executeValidateCoupon = async (validateCouponData: ValidateCouponPayload) => {
    shoppingCart.value.currentItem.coupon = await validateCoupon(validateCouponData)
  }
  return {
    executeValidateCoupon,
  }
}
