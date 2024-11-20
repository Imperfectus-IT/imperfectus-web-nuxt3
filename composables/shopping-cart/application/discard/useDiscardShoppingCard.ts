export const useDiscardShoppingCart = () => {
  const { shoppingCart } = useShoppingCartState()

  const executeDiscardShoppingCart = () => {
    shoppingCart.value = createEmpty()
  }

  return {
    shoppingCart,
    executeDiscardShoppingCart,
  }
}
