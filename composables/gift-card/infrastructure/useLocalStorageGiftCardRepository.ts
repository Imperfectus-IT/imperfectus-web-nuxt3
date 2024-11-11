export const useLocalStorageGiftCardRepository = () => {
  const { getItem, setItem } = useLocalStorage()
  const key: string = 'giftCard'
  return {
    getGiftCard: () => {
      const response = getItem(key)
      if (response.length === 0) {
        return
      }
      return response
    },
    setGiftCard: (item: GiftCardPurchase) => {
      setItem(key, item)
    },
  }
}
