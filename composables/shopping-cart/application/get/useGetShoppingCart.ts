export const useGetShoppingCart = () => {
  const { shoppingCart } = useShoppingCartState()
  const { getShoppingCart } = useLocalStorageShoppingCartRepository()

  const executeGetShoppingCart = () => {
    const cart = getShoppingCart()
    cart ? shoppingCart.value = cart : ''
  }

  return {
    shoppingCart,
    executeGetShoppingCart,
  }
}
