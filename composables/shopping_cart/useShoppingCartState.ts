export const useShoppingCartState = () => {
  const { getShoppingCart } = useInMemoryShoppingCartRepository()
  const shoppingCart: Ref<ShoppingCart> = useState('shoppingCart', (): ShoppingCart => {
    return getShoppingCart()
  })

  return {
    shoppingCart,
  }
}
