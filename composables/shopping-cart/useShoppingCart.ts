export const useShoppingCart = () => {
  const { getShoppingCart } = useInMemoryShoppingCartRepository()

  const initShoppingCart = (shoppingCart: Ref<ShoppingCart>) => {
    shoppingCart.value = getShoppingCart()
  }

  return {
    initShoppingCart,
  }
}
