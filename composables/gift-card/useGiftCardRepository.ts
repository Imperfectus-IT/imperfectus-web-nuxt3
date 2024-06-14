export const useGiftCardRepository = () => {
  const create = async (giftCards: GiftCard[]): Promise<GiftCard> => {
    const { create } = useStrapi()
    const user = useStrapiUser();
    const amount: number = giftCards.reduce((acc, giftCard) => acc + giftCard.amount * giftCard.quantity, 0)
    console.log('Amount', amount)
    return await create('gift-cards', {
      giftCards,
      amount: parseFloat(amount),
      user: user.value.user_id
    })
  }

  return {
    create,
  }
}
