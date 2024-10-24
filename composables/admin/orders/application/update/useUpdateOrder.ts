import type { ComposerTranslation } from 'vue-i18n'
import type { Order, OrderBilling } from '~/composables/admin/orders/domain/OrderType.ts'
import type { Coupon } from '~/composables/admin/subscriptions/domain/SubscriptionTypes.ts'
import type { updateOrderItemPayload } from '~/components/admin/my-orders/partials/OrderEdit.vue'
import type { updateOrderShippingPayload } from '~/components/admin/my-orders/DesktopOrder.vue'

export const useUpdateOrder = () => {
  const { addOrderReview, addOrderCoupon, discardOrder, findOrdersByUser, removeOrderCoupon, updateOrderItem, updateOrderBilling, updateOrderShipping, updateShippingCoverage } = useOrderRepository()
  const { orders } = useOrdersState()

  const executeAddOrderReview = async (order: Order, review: string) => {
    await addOrderReview(order, review)
    orders.value = await findOrdersByUser()
  }

  const executeAddOrderCoupon = async (order: Order, coupon: string) => {
    const response = await addOrderCoupon(order, coupon)
    orders.value = await findOrdersByUser()
    return response
  }

  const executeDiscardOrder = async (orderId: number) => {
    await discardOrder(orderId)
    orders.value = await findOrdersByUser()
  }

  const executeRemoveOrderCoupon = async (order: Order, coupon: Coupon) => {
    await removeOrderCoupon(order, coupon)
    orders.value = await findOrdersByUser()
  }

  const executeUpdateOrderItem = async (updateOrderItemData: updateOrderItemPayload) => {
    await updateOrderItem(updateOrderItemData)
    orders.value = await findOrdersByUser()
  }

  const executeUpdateOrderBilling = async (meta: OrderBilling, orderMetaId: number) => {
    await updateOrderBilling(meta, orderMetaId)
    orders.value = await findOrdersByUser()
  }

  const executeUpdateOrderShipping = async (meta: updateOrderShippingPayload, orderMetaId: number) => {
    await updateOrderShipping(meta, orderMetaId)
    orders.value = await findOrdersByUser()
  }

  const executeUpdateShippingCoverage = async (orderMetaId: number, newCoverage: SubscriptionCoverage) => {
    await updateShippingCoverage(orderMetaId, newCoverage)
    orders.value = await findOrdersByUser()
  }

  return {
    executeAddOrderReview,
    executeAddOrderCoupon,
    executeDiscardOrder,
    executeRemoveOrderCoupon,
    executeUpdateOrderItem,
    executeUpdateOrderBilling,
    executeUpdateOrderShipping,
    executeUpdateShippingCoverage,
  }
}
