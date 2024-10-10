import type { ComposerTranslation } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import type { Order, OrderBilling } from '~/composables/admin/orders/domain/OrderType.ts'
import type { Coupon } from '~/composables/admin/subscriptions/domain/SubscriptionTypes.ts'
import type { updateOrderItemPayload } from '~/components/admin/my-orders/partials/OrderEdit.vue'
import type { updateOrderShippingPayload } from '~/components/admin/my-orders/DesktopOrder.vue'

export const useUpdateOrderHandler = (t: ComposerTranslation) => {
  const toast = useToast()
  const { successToast, errorToast } = useToastService()
  const { executeAddOrderReview, executeDiscardOrder, executeAddOrderCoupon, executeRemoveOrderCoupon, executeUpdateOrderItem, executeUpdateOrderBilling, executeUpdateOrderShipping } = useUpdateOrder(t)

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
  const addOrderCoupon = async (order: Order, coupon: string, textData: string) => {
    try {
      const response = await executeAddOrderCoupon(order, coupon)
      if (response.discountValue) {
        successToast(toast, t(`${textData}coupon.add.successToast.title`), t(`${textData}coupon.add.successToast.description`))
      }
      else {
        errorToast(toast, t(`${textData}coupon.add.notValidToast.title`), t(`${textData}coupon.add.notValidToast.description`))
      }
    }
    catch (error) {
      console.log('Error on adding coupon', error)
      errorToast(toast, t(`${textData}coupon.errorToast.title`), t(`${textData}coupon.errorToast.description`))
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

  return {
    addOrderReview,
    addOrderCoupon,
    discardOrder,
    removeOrderCoupon,
    updateOrderItem,
    updateOrderBilling,
    updateOrderShipping,
  }
}
