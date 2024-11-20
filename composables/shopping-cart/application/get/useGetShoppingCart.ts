export const useGetShoppingCart = () => {
  const { shoppingCart } = useShoppingCartState()
  const { getShoppingCart } = useLocalStorageShoppingCartRepository()

  const executeGetShoppingCart = () => {
    shoppingCart.value = getShoppingCart()
  }

  return {
    shoppingCart,
    executeGetShoppingCart,
  }
}
