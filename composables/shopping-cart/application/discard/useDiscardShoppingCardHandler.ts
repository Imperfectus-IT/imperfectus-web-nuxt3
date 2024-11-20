export const useDiscardShoppingCartHandler = () => {
  const { shoppingCart, executeDiscardShoppingCart } = useDiscardShoppingCart()
  const { removeShoppingCart } = useLocalStorageShoppingCartRepository()

  const handleDiscardShoppingCart = () => {
    executeDiscardShoppingCart()
    removeShoppingCart()
  }

  return {
    shoppingCart,
    handleDiscardShoppingCart,
  }
}
