import type { ComposerTranslation } from 'vue-i18n'
import type { Coupon } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'
import type { Order, OrderBilling } from '~/composables/admin/orders/types/OrderType.ts'
import type { updateOrderItemPayload } from '~/components/admin/my-orders/partials/OrderEdit.vue'
import type { updateOrderShippingPayload } from '~/components/admin/my-orders/DesktopOrder.vue'

export const useOrderRepository = (t: ComposerTranslation) => {
  const { find, update } = useStrapi()
  const client = useStrapiClient()

  const findOrdersByUser = async (): Promise<Order[]> => {
    const user = useStrapiUser()
    const strapiOrders = await find('orders', {
      user: user.value?.id,
      discarded: false,
      _sort: 'created_at:desc',
      _limit: 10,
    }, ['order_items'])

    return strapiOrders.map((order: any) => useOrdersFactory(order, t))
  }
  const findById = async (id: number): Promise<Order> => {
    const { find } = useStrapi()
    const [order] = await find<Array<Order>>('orders', { id })
    return order
  }
  const addOrderReview = async (order: Order, review: string) => {
    const { update } = useStrapi()
    return await update('orders', order.id, { order_review: review })
  }
  // @TODO API SHOULD RETURN ERROR KEY WHEN COUPON IS INVALID LIKE IN SUBSCRIPTIONS
  const addOrderCoupon = async (order: Order, coupon: string) => {
    const params = { coupon }
    const foundCoupon: Coupon = (await find<Coupon[]>(`coupons`, params))[0]
    await client(`orders/${order.id}/coupon`, { method: 'PUT', body: { coupon: foundCoupon } })
    const response = await client('orders/total', { method: 'POST',
      body: {
        items: [...order.orderItems],
        coupon: foundCoupon,
        isPlaced: true,
        delivery: null,
        orderId: order.id,
      },
    })
    return response
  }

  const discardOrder = async (orderId: number) => {
    return await update('orders', orderId, { discarded: true })
  }

  const removeOrderCoupon = async (order: Order, coupon: Coupon) => {
    await client(`orders/${order.id}/coupon`, { method: 'PUT', body: { coupon: null } })
    return await client('orders/total', {
      method: 'POST',
      body: {
        items: [...order.orderItems],
        coupon,
        isPlaced: true,
        delivery: null,
        orderId: order.id,
      },
    })
  }

  const updateOrderItem = async (updateOrderItemData: updateOrderItemPayload) => {
    const { orderItemId, newBoxProduct, exclusions, order } = updateOrderItemData
    const { amount, weight } = newBoxProduct
    return await update('order-items', orderItemId, { orderItemId, product: newBoxProduct.id, exclusions, amount, weight, order })
  }

  const updateOrderBilling = async (meta: OrderBilling, orderMetaId: number) => {
    const strapiMeta = {
      billing_firstname: meta.billingFirstName,
      billing_lastname: meta.billingLastName,
      billing_address1: meta.billingAddress,
      billing_address2: meta.billingAddress2,
      billing_city: meta.billingCity,
      billing_state: meta.billingState,
      billing_country: meta.billingCountry,
      billing_postcode: meta.billingPostCode,
      billing_phone: meta.billingPhone,
      billing_email: meta.billingEmail,
      billing_cif: meta.billingCif,
    }
    return await client(`order-metas/${orderMetaId}/billing`, {
      method: 'PUT', body: { meta: strapiMeta },
    })
  }

  const updateOrderShipping = async (meta: updateOrderShippingPayload, orderMetaId: number) => {
    console.log('repo', meta)
    const strapiMeta = {
      shipping_firstname: meta.shippingFirstName,
      shipping_lastname: meta.shippingLastName,
      shipping_email: meta.shippingEmail,
      shipping_phone: meta.shippingPhone,
      shipping_address1: meta.shippingAddress,
      shipping_address2: meta.shippingAddress2,
      shipping_city: meta.shippingCity,
      shipping_postcode: meta.shippingPostCode,
      shipping_coverage: meta.shippingCoverage,
      shipping_notes: meta.shippingNotes,
      shipping_state: meta.shippingState,
      shipping_country: meta.shippingCountry,
    }
    return await client(`order-metas/${orderMetaId}/shipping`, {
      method: 'PUT', body: {
        meta: {
          order: meta.order, ...strapiMeta,
        },
      },
    })
  }

  return {
    addOrderCoupon,
    addOrderReview,
    discardOrder,
    findOrdersByUser,
    findById,
    removeOrderCoupon,
    updateOrderItem,
    updateOrderShipping,
    updateOrderBilling,
  }
}
