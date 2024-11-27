export const useGiftCardRepository = () => {
  const user = useStrapiUser()
  const { create, find } = useStrapi()
  const client = useStrapiClient()
  const createGiftCard = async (giftCardPurchase: GiftCardPurchase) => {
    const amount: number = giftCardPurchase.items.reduce(
      (acc, giftCard) => acc + giftCard.amount * giftCard.quantity,
      0,
    )

    return await create('gift-cards', {
      giftCards: giftCardPurchase.items,
      amount,
      user: user.value?.id,
    })
  }

  const getGiftCardByNotification = async (notification: string): Promise<GiftCard[]> => {
    const strapiGiftCard: any[] = await client(`/order-payments/${notification}/cards`)
    return strapiGiftCard.map((card: GiftCard) => useGiftCardFactory(card))
  }

  const getGiftCardsByUser = async (): Promise<GiftCard[]> => {
    const cards = await find('gift-cards', {
      user: user.value?.id,
    })
    return cards.map((card: GiftCard) => useGiftCardFactory(card)).sort((cardA, cardB) => cardB.id - cardA.id)
  }

  return {
    createGiftCard,
    getGiftCardsByUser,
    getGiftCardByNotification,
  }
}
