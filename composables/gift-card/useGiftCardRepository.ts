export const useGiftCardRepository = () => {
  const create = async (giftCards: GiftCard[]): Promise<GiftCard> => {
    const {create} = useStrapi()
    const {id} = useStrapiUser().value
    giftCards = giftCards.map(card => ({
      ...card,
      amount: card.amount * card.quantity
    }));
    const amount: number = giftCards.reduce((acc, giftCard) => acc + giftCard.amount, 0);
    return await create('gift-cards', {
      giftCards,
      amount: parseFloat(amount),
      user: id
    })
  }

  const getGiftCardsByUser = async (): Promise<GiftCard[]> => {
    const {find} = useStrapi()
    const {id} = useStrapiUser().value
    const cards = await find('gift-cards', {
      user: id
    })
    return cards.map((card: GiftCard) => useGiftCardFactory(card)).sort((cardA, cardB) => cardB.id - cardA.id)
  }

  return {
    create,
    getGiftCardsByUser
  }
}
