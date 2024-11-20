export const useGetShoppingCart = () => {
  const { shoppingCart } = useShoppingCartState()
  const { getShoppingCart } = useLocalStorageShoppingCartRepository()

  const executeGetShoppingCart = () => {
    const response = getShoppingCart()
    if (response) {
      shoppingCart.value = response
    }
  }

  return {
    shoppingCart,
    executeGetShoppingCart,
  }
}
