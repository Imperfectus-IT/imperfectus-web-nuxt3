import { createEmpty } from '../domain/ShoppingCart.ts'

export const useLocalStorageShoppingCartRepository = () => {
  const { getItem, setItem } = useLocalStorage()
  const key: string = 'shoppingCart'
  return {
    getShoppingCart: () => {
      const response = getItem(key)
      if (response.length === 0) {
        return createEmpty()
      }
      return response
    },
    setShoppingCart: (item: ShoppingCart) => {
      setItem(key, item)
    },
  }
}
