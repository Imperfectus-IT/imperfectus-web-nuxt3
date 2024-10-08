export const useInMemoryShoppingCartRepository = () => {
  const { emptyShoppingCart } = useShoppingCartFactory()
  const getShoppingCart = () => emptyShoppingCart()

  return {
    getShoppingCart,
  }
}
