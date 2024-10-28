export const useStrapiOrderItemFactory = (orderItem: OrderItem): StrapiOrderItem => {
  console.log('orderItem', orderItem);
  return {
    id: orderItem.id,
    product: orderItem.product,
    quantity: orderItem.quantity,
    status: orderItem.status,
    amount: orderItem.amount,
    subscription: orderItem.subscription,
    weight: orderItem.weight,
    image: orderItem.image,
    deliveryDate: orderItem.deliveryDate,
    notes: orderItem.notes,
    coupon_id: orderItem.coupon,
    exclusions: orderItem.exclusions,
    trackingUrl: orderItem.trackingUrl,
    trackingId: orderItem.trackingId,
  }
};
