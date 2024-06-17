import { giftCardCreator } from "~/composables/gift-card/useGiftCardState.ts";
export const useGiftCard = () => {
  const { giftCard } = useGiftCardState();
  const { create } = useGiftCardRepository();

  const executeCreateGiftCard = async () => {
    return await create(giftCard.value)
  }

  const executeAddGiftCard = () => {
    giftCard.value.unshift(giftCardCreator());
  }

  const executeRemoveGiftCard = (index: number) => {
    giftCard.value.splice(index, 1);
  }

  return {
    executeCreateGiftCard,
    executeAddGiftCard,
    executeRemoveGiftCard,
    giftCard,
  }
}
