import type { ComposerTranslation } from 'vue-i18n'
import type { Order, OrderBilling } from '~/composables/admin/orders/types/OrderType.ts'
import type { updateOrderItemPayload } from '~/components/admin/my-orders/partials/OrderEdit.vue'
import type { updateOrderShippingPayload } from '~/components/admin/my-orders/DesktopOrder.vue'

export const useOrderRepository = (t: ComposerTranslation) => {
  const { find, update } = useStrapi()
  const client = useStrapiClient()

  const findOrdersByUser = async (): Promise<Order[]> => {
    // const user = useStrapiUser()
    // const strapiOrders = await find('orders', {
    //   user: user.value?.id,
    //   discarded: false,
    //   _sort: 'created_at:desc',
    //   _limit: 10,
    // })
    // return strapiOrders.map((order: any) => useOrdersFactory(order, t))
    // @TODO PASS USER ID TO HTTP REQUEST QUERY AND GET TOKEN FROM COOKIES
    const token = useCookie('strapi_jwt')
    console.log('TOKEN', token.value)
    const orders = await useFetch(`/api/v1/orders/getByUserId?user=11798`, { method: 'GET', headers: {
      Authorization: `Bearer ${token}`,
    } })

    return orders
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
    const payload = {
      items: [...order.orderItems],
      coupon: foundCoupon,
      isPlaced: true,
      delivery: null,
      orderId: order.id,
    }
    return await getAmount(payload)
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

  const getAmount = async (payload: OrderAmountQuery): Promise<any> => {
    return await client('orders/total', { method: 'POST', body: payload })
  }

  const getFirstPaidOrder = async (): Promise<Order> => {
    return await client('orders/firstPaidOrder', { method: 'GET' })
  }

  return {
    addOrderCoupon,
    addOrderReview,
    discardOrder,
    findOrdersByUser,
    findById,
    getAmount,
    getFirstPaidOrder,
    removeOrderCoupon,
    updateOrderItem,
    updateOrderShipping,
    updateOrderBilling,
  }
}
