export const useLocalStorageGiftCardRepository = () => {
  const { getItem, setItem } = useLocalStorage();
  const key: string = 'giftCard';
  return {
    getGiftCardPurchase: () => {
      const response = getItem(key);
      if (response.length === 0) {
        return
      }
      return response
    },
    setGiftCardPurchase: (item: GiftCardPurchase) => {
      setItem(key, item)
    },
  }
};
