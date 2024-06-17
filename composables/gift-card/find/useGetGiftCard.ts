export const useGetGiftCards = () => {
  const {getGiftCardsByUser} = useGiftCardRepository();

  const executeGetGiftCardsByUser = async () => {
    return await getGiftCardsByUser();
  }

  return {
    executeGetGiftCardsByUser
  }
}
