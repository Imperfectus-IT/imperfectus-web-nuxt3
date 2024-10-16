export const useStrapiSubscriptionItemFactory = (item: SubscriptionItem, subscriptionId: number) => {
  return {
    amount: item.amount,
    coupon_id: item.coupon,
    exclusions: item.exclusions,
    id: item.id,
    product: item.product.id,
    quantity: item.quantity,
    sku: item.sku,
    subscription: subscriptionId,
  }
}
