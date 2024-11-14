export const useGiftCardRepository = () => {
  const user = useStrapiUser()
  const { create, find } = useStrapi()
  // const createGiftCard = async (giftCardPurchase: GiftCardPurchase): Promise<GiftCard> => {
  //   giftCards = giftCards.map(card => ({
  //     ...card,
  //     amount: card.amount * card.quantity,
  //   }))
  //   const amount: number = giftCards.reduce((acc, giftCard) => acc + giftCard.amount, 0)
  //   return await create('gift-cards', {
  //     giftCards,
  //     amount,
  //     user: user.value?.id,
  //   })
  // }

  // const getGiftCardsByUser = async (): Promise<GiftCard[]> => {
  //   const cards = await find('gift-cards', {
  //     user: user.value?.id,
  //   })
  //   return cards.map((card: GiftCard) => useGiftCardFactory(card)).sort((cardA, cardB) => cardB.id - cardA.id)
  // }

  return {
    // createGiftCard,
  }
}
