import { createEmpty } from '~/composables/shopping-cart/domain/ShoppingCart.ts'

export const useShoppingCartState = () => {
  const shoppingCart: Ref<ShoppingCart> = useState('shoppingCart', (): ShoppingCart => createEmpty())
  const setShoppingCart = (value: ShoppingCart) => {
    shoppingCart.value = value
  }

  return {
    shoppingCart,
    setShoppingCart,
  }
}
