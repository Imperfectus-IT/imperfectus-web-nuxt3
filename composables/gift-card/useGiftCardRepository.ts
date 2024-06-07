export const useGiftCardRepository = () => {
  const create = async (giftCard: GiftCard): Promise<GiftCard> => {
    const { create } = useStrapi()
    return await create('gift-cards', giftCard)
  }

  return {
    create,
  }
}
