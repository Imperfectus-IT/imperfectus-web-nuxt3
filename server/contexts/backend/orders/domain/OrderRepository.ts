export interface OrderRepository {
  addReview(order: Order, review: string): Promise<void>

  addItemCoupon(order: Order, coupon: string): Promise<void>

  create(order: Order): Promise<Order[]>

  discard(orderId: number): Promise<void>

  getByUserId(userId: number): Promise<Order[]>

  getById(id: string): Promise<Order>

  removeItemCoupon(order: Order, coupon: string): Promise<void>

  updateItem(updateItemData: updateItemPayload): Promise<void>

  updateOrderBilling(meta: OrderBilling, orderMetaId: number): Promise<void>

  updateOrderShipping(meta: OrderShipping, orderMetaId: number): Promise<void>

  getAmount(data: OrderAmountPayload): Promise<number>

  getFirstPaidOrder(): Promise<Order>

}
