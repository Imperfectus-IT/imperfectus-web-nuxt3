export const useValidateCoupon = () => {
  const { validateCoupon } = useStrapiCouponRepository()
  const { shoppingCart } = useShoppingCartState()
  const executeValidateCoupon = async (validateCouponData: ValidateCouponPayload) => {
    const foundCoupon = await validateCoupon(validateCouponData)
    const { items } = shoppingCart.value
    shoppingCart.value.items = items.map((item: ShoppingCartItem) => {
      item.coupon = foundCoupon
      return item
    })
  }
  return {
    executeValidateCoupon,
  }
}
