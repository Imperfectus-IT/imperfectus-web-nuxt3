export const useLocalStorageGiftCardRepository = () => {
  const { getItem, setItem } = useLocalStorage();
  const key: string = 'giftCard';
  return {
    getGiftCard: () => {
      const response = getItem(key);
      if (response.length === 0) {
        console.log('No gift card found')
      }
      return response
    },
    setGiftCard: (item: GiftCard) => {
      setItem(key, item)
    },
  }
};
