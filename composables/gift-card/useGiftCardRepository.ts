import { useGiftCardState } from './useGiftCardState'

export const useGiftCardRepository = () => {
  const create = async (giftCard: GiftCard): Promise<GiftCard> => {
    const { create } = useStrapi()
    const createdGiftCard = await create('gift-cards', giftCard)
    return createdGiftCard
  }

  return {
    create,
  }
}
