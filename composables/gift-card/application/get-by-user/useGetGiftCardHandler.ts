export const useGetGiftCardsHandler = () => {
  const { executeGetGiftCardsByUser } = useGetGiftCards()

  return {
    getGiftCardByUser: executeGetGiftCardsByUser,
  }
}
