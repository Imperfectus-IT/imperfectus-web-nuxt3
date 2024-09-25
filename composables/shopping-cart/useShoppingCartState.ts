export const useShoppingCartState = () => {
  const { getShoppingCart } = useLocalStorageShoppingCartRepository()
  const shoppingCart: Ref<ShoppingCart> = useState('shoppingCart', (): ShoppingCart => {
    return getShoppingCart()
  })

  return {
    shoppingCart,
  }
}
