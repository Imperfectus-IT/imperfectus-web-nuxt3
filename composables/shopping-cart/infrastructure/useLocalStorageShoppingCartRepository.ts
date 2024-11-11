import { createEmpty as createEmptyShoppingCart } from '../domain/ShoppingCart.ts'

export const useLocalStorageShoppingCartRepository = () => {
  const { getItem, setItem, removeItem } = useLocalStorage()
  const key: string = 'shoppingCart'
  return {
    getShoppingCart: () => {
      const response = getItem(key)
      if (response.length === 0) {
        setItem(key, createEmptyShoppingCart())
        return
      }
      return response
    },
    setShoppingCart: (item: ShoppingCart) => {
      setItem(key, item)
    },
    removeShoppingCart: (key: string) => {
      removeItem(key)
    },
  }
}
