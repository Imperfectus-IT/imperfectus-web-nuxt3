import type { ShoppingCart } from './types/ShoppingCartType.ts'

export const useShoppingCartState = () => {
  const { emptyShoppingCart } = useShoppingCartFactory()
  const shoppingCart: Ref<ShoppingCart> = useState('orderShoppingCart', (): ShoppingCart => emptyShoppingCart())
  return {
    shoppingCart,
  }
}
