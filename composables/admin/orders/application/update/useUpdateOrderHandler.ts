import type { ComposerTranslation } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import type { Order, OrderBilling } from '~/composables/admin/orders/domain/OrderType.ts'
import type { Coupon } from '~/composables/admin/subscriptions/domain/SubscriptionTypes.ts'
import type { updateOrderItemPayload } from '~/components/admin/my-orders/partials/OrderEdit.vue'
import type { updateOrderShippingPayload } from '~/components/admin/my-orders/DesktopOrder.vue'
import { useFindCoupon } from '~/composables/shared/coupons/application/find/useFindCoupon.ts'

export const useUpdateOrderHandler = (t: ComposerTranslation) => {
  const toast = useToast()
  const { successToast, errorToast } = useToastService()
  const { executeAddOrderReview, executeDiscardOrder, executeAddOrderCoupon, executeRemoveOrderCoupon, executeUpdateOrderItem, executeUpdateOrderBilling, executeUpdateOrderShipping, executeUpdateShippingCoverage } = useUpdateOrder(t)
  const { executeFindCoupon } = useFindCoupon()
  const addOrderReview = async (order: Order, review: string, textData: string) => {
    try {
      await executeAddOrderReview(order, review)
      successToast(toast, t(`${textData}review.successToast.title`), t(`${textData}review.successToast.description`))
    }
    catch (error) {
      console.log('Error on adding review', error)
      errorToast(toast, t(`${textData}review.errorToast.title`), t(`${textData}review.errorToast.description`))
    }
  }

  const addOrderCoupon = async (order: Order, coupon: string) => {
    try {
      const foundCoupon = await executeFindCoupon(coupon)
      await executeAddOrderCoupon(order, foundCoupon)
      successToast(toast, t(`subscriptions.subscription.addCoupon.successToast.add.title`), t(`subscriptions.subscription.addCoupon.successToast.add.description`))
    }
    catch (error) {
      console.log('Error on adding subscription coupon', error)
      if (error && typeof error === 'object' && 'key' in error) {
        const typedError = error as { key: string, message: string }
        errorToast(toast, t(`subscriptions.subscription.addCoupon.errorToast.title`), t(`subscriptions.subscription.addCoupon.errorToast.${typedError.key}`))
      }
      else {
        errorToast(toast, t(`subscriptions.subscription.addCoupon.errorToast.title`), t(`subscriptions.subscription.addCoupon.errorToast.description`))
      }
    }
  }
  const discardOrder = async (orderId: number, textData: string) => {
    try {
      await executeDiscardOrder(orderId)
      successToast(toast, t(`${textData}discard.successToast.title`), t(`${textData}discard.successToast.description`))
    }
    catch (error) {
      console.log('Error discarding order', error)
      errorToast(toast, t(`${textData}discard.errorToast.title`), t(`${textData}discard.errorToast.description`))
    }
  }
  const removeOrderCoupon = async (order: Order, coupon: Coupon, textData: string) => {
    try {
      await executeRemoveOrderCoupon(order, coupon)
      successToast(toast, t(`${textData}coupon.remove.successToast.title`), t(`${textData}coupon.remove.successToast.description`))
    }
    catch (error) {
      console.log('Error on removing coupon', error)
      errorToast(toast, t(`${textData}coupon.errorToast.title`), t(`${textData}coupon.errorToast.description`))
    }
  }
  const updateOrderItem = async (updateOrderItemData: updateOrderItemPayload, textData: string) => {
    try {
      await executeUpdateOrderItem(updateOrderItemData)
      successToast(toast, t(`${textData}edit.successToast.title`), t(`${textData}edit.successToast.description`))
    }
    catch (error) {
      console.log('Error on updating order item', error)
      errorToast(toast, t(`${textData}edit.errorToast.title`), t(`${textData}edit.errorToast.description`))
    }
  }
  const updateOrderBilling = async (meta: OrderBilling, orderMetaId: number, textData: string) => {
    try {
      await executeUpdateOrderBilling(meta, orderMetaId)
      successToast(toast, t(`${textData}billingInfo.successToast.title`), t(`${textData}billingInfo.successToast.description`))
    }
    catch (error) {
      console.log('Error on updating order billing', error)
      errorToast(toast, t(`${textData}billingInfo.errorToast.title`), t(`${textData}billingInfo.errorToast.description`))
    }
  }
  const updateOrderShipping = async (meta: updateOrderShippingPayload, orderMetaId: number, textData: string) => {
    try {
      await executeUpdateOrderShipping(meta, orderMetaId)
      successToast(toast, t(`${textData}shipping.successToast.title`), t(`${textData}shipping.successToast.description`))
    }
    catch (error) {
      console.log('Error on updating order shipping', error)
      errorToast(toast, t(`${textData}shipping.errorToast.title`), t(`${textData}shipping.errorToast.description`))
    }
  }

  const updateOrderCoverage = async (metaId: number, newCoverage: SubscriptionCoverage) => {
    try {
      await executeUpdateShippingCoverage(metaId, newCoverage)
    }
    catch (error) {
      console.log('Error on updating subscription coverage')
    }
  }

  return {
    addOrderReview,
    addOrderCoupon,
    discardOrder,
    removeOrderCoupon,
    updateOrderItem,
    updateOrderBilling,
    updateOrderShipping,
    updateOrderCoverage,
  }
}
