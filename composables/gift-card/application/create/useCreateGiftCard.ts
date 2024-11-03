import { giftCardCreator } from '~/composables/gift-card/application/useGiftCardState.ts'

export const useGiftCard = () => {
  const toast = useToast()
  const { errorToast } = useToastService()
  const { giftCard } = useGiftCardState()
  const { create } = useGiftCardRepository()

  const executeCreateGiftCard = async () => {
    return await create(giftCard.value)
  }

  const executeAddGiftCard = () => {
    giftCard.value.unshift(giftCardCreator())
  }

  const executeRemoveGiftCard = (index: number) => {
    if (giftCard.value.length === 1) {
      return errorToast(toast, 'Error', 'Debe tener almenos una tarjeta de regalo')
    }
    giftCard.value.splice(index, 1)
  }

  return {
    executeCreateGiftCard,
    executeAddGiftCard,
    executeRemoveGiftCard,
    giftCard,
  }
}
