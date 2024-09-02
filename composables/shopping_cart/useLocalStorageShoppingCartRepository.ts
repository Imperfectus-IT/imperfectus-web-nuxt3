export const useLocalStorageShoppingCartRepository = () => {
  const { emptyShoppingCart } = useShoppingCartFactory()
  const { getItem, setItem } = useLocalStorage()
  const key: string = 'shoppingCart'
  return {
    getShoppingCart: () => getItem(key)?.length ? getItem(key) : emptyShoppingCart(),
    setShoppingCart: (item: ShoppingCart) => setItem(key, item),
  }
}
