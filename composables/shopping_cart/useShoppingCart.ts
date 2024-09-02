export const useShoppingCart = () => {
  const { setShoppingCart, getShoppingCart } = useLocalStorageShoppingCartRepository()
  const saveShoppingCartLocalStorage = (shoppingCart: ShoppingCart) => {
    setShoppingCart(shoppingCart)
  }
  const initShoppingCart = (shoppingCart: Ref<ShoppingCart>) => {
    shoppingCart.value = getShoppingCart()
  }

  return {
    initShoppingCart,
    saveShoppingCartLocalStorage,
  }
}
