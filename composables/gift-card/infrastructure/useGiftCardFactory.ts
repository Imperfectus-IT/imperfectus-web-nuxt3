export const useGiftCardFactory = (giftCard: any): GiftCard => {
  return {
    id: giftCard.id,
    amount: giftCard.amount,
    forWho: giftCard.forWho,
    message: giftCard.message,
    whoSend: giftCard.whoSend,
    designId: giftCard.designId,
    sendMethod: giftCard.sendMethod,
    order: giftCard.order,
    coupon: giftCard.coupon,
  }
}
