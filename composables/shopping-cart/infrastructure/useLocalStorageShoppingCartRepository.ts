export const useLocalStorageShoppingCartRepository = () => {
  const { getItem, setItem, removeItem } = useLocalStorage()
  const key: string = 'shoppingCart'
  return {
    getShoppingCart: () => {
      const response = getItem(key)
      if (response.length === 0) {
        return
      }
      return response
    },
    setShoppingCart: (item: ShoppingCart) => {
      setItem(key, item)
    },
    removeShoppingCart: () => {
      removeItem(key)
    },
  }
}
