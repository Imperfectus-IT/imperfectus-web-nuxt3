import type { ComposerTranslation } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import type { Order, OrderBilling } from '~/composables/admin/orders/types/OrderType.ts'
import type { Coupon } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'
import type { updateOrderItemPayload } from '~/components/admin/my-orders/partials/OrderEdit.vue'
import type { updateOrderShippingPayload } from '~/components/admin/my-orders/DesktopOrder.vue'

export const useUpdateOrderHandler = (t: ComposerTranslation) => {
  const toast = useToast()
  const { successToast, errorToast } = useToastService()
  const { executeAddOrderReview, executeDiscardOrder, executeAddOrderCoupon, executeRemoveOrderCoupon, executeUpdateOrderItem, executeUpdateOrderBilling, executeUpdateOrderShipping } = useUpdateOrder(t)

  const handleAddOrderReview = async (order: Order, review: string, textData: string) => {
    try {
      await executeAddOrderReview(order, review)
      successToast(toast, t(`${textData}coupon.successToast.title`), t(`${textData}coupon.successToast.description`))
    }
    catch (error) {
      console.log('Error on adding review', error)
      errorToast(toast, t(`${textData}coupon.errorToast.title`), t(`${textData}coupon.errorToast.description`))
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
      successToast(toast, t(`${textData}coupon.add.successToast.title`), t(`${textData}coupon.add.successToast.description`))
    }
    catch (error) {
      console.log('Error discarding order', error)
      errorToast(toast, t(`${textData}coupon.errorToast.title`), t(`${textData}coupon.errorToast.description`))
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
      successToast(toast, t(`${textData}coupon.add.successToast.title`), t(`${textData}coupon.add.successToast.description`))
    }
    catch (error) {
      console.log('Error on updating order item', error)
      errorToast(toast, t(`${textData}coupon.errorToast.title`), t(`${textData}coupon.errorToast.description`))
    }
  }
  const updateOrderBilling = async (meta: OrderBilling, orderMetaId: number, textData: string) => {
    try {
      await executeUpdateOrderBilling(meta, orderMetaId)
      successToast(toast, t(`${textData}coupon.add.successToast.title`), t(`${textData}coupon.add.successToast.description`))
    }
    catch (error) {
      console.log('Error on updating order billing', error)
      errorToast(toast, t(`${textData}coupon.errorToast.title`), t(`${textData}coupon.errorToast.description`))
    }
  }

  const updateOrderShipping = async (meta: updateOrderShippingPayload, orderMetaId: number, textData: string) => {
    try {
      await executeUpdateOrderShipping(meta, orderMetaId)
      successToast(toast, t(`${textData}coupon.add.successToast.title`), t(`${textData}coupon.add.successToast.description`))
    }
    catch (error) {
      console.log('Error on updating order shipping', error)
      errorToast(toast, t(`${textData}coupon.errorToast.title`), t(`${textData}coupon.errorToast.description`))
    }
  }

  return {
    handleAddOrderReview,
    addOrderCoupon,
    discardOrder,
    removeOrderCoupon,
    updateOrderItem,
    updateOrderBilling,
    updateOrderShipping,
  }
}
