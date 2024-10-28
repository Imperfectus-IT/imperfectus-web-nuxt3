import type { ComposerTranslation } from 'vue-i18n'
import type { Order, OrderBilling } from '~/composables/admin/orders/domain/OrderType.ts'
import type { updateOrderItemPayload } from '~/components/admin/my-orders/partials/OrderEdit.vue'
import type { updateOrderShippingPayload } from '~/components/admin/my-orders/DesktopOrder.vue'
import type { SubscriptionCoverage } from '~/composables/admin/subscriptions/domain/SubscriptionTypes.ts'
import { useOrdersFactory } from '~/composables/admin/orders/infrastructure/useOrdersFactory.ts'
import type { createOrderItemReviewPayload } from '~/components/admin/my-orders/MobileOrder.vue'

export const useOrderRepository = () => {
  const { find, update, create } = useStrapi();
  const client = useStrapiClient();

  const createOrder = async (cart: ShoppingCart) => {
    const newOrder = useStrapiPurchaseFactory(cart);
    const strapiOrderCreated = await client('orders/order', {
      method: 'POST',
      body: newOrder,
    });
    return useOrdersFactory(strapiOrderCreated)
  };

  const createOrderItemReview = async (newReview: createOrderItemReviewPayload) => {
    const { newRatings, orderItemId } = newReview;
    return await create('order-item-reviews', {
      order_item: orderItemId,
      ratings: newRatings,
    })
  };

  const findOrdersByUser = async (): Promise<Order[]> => {
    const user = useStrapiUser();
    const strapiOrders = await find('orders', {
      user: user.value?.id,
      discarded: false,
      _sort: 'created_at:desc',
      _limit: 10,
    });
    return strapiOrders.map((order: any) => useOrdersFactory(order))
  };

  const findByNotification = async (notification: string) => {
    const [strapiOrder] = await client(`orders/byNotification/${notification}`, { method: 'GET' });
    console.log('strapiOrder', strapiOrder);
    return useOrdersFactory(strapiOrder, t)
  };

  const findById = async (id: number): Promise<Order> => {
    const [order] = await find<Array<Order>>('orders', { id });
    return useOrdersFactory(order)
  };
  const addOrderReview = async (order: Order, review: string) => {
    const { update } = useStrapi();
    return await update('orders', order.id, { order_review: review })
  };
  // @TODO API SHOULD RETURN ERROR KEY WHEN COUPON IS INVALID LIKE IN SUBSCRIPTIONS

  const addOrderCoupon = async (order: Order, coupon: string) => {
    return await client(`orders/${order.id}/coupon`, {
      method: 'PUT',
      body: {
        coupon_id: coupon,
      },
    })
  };

  const discardOrder = async (orderId: number) => {
    return await update('orders', orderId, { discarded: true })
  };

  const removeOrderCoupon = async (order: Order, coupon: Coupon) => {
    await client(`orders/${order.id}/coupon`, { method: 'PUT', body: { coupon_id: null } });
    const orderItemsIds = order.orderItems.map((item: OrderItem) => item.id);
    const strapiOrderItems = await find('order-items', { id_in: orderItemsIds });
    return await client('orders/total', {
      method: 'POST',
      body: {
        items: strapiOrderItems,
        coupon,
        isPlaced: true,
        delivery: null,
        orderId: order.id,
      },
    })
  };

  const updateOrderItem = async (updateOrderItemData: updateOrderItemPayload) => {
    const { orderItemId, newBoxProduct, exclusions, order } = updateOrderItemData;
    const { amount, weight } = newBoxProduct;
    return await update('order-items', orderItemId, { orderItemId, product: newBoxProduct.id, exclusions, amount, weight, order })
  };

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
    };
    return await client(`order-metas/${orderMetaId}/billing`, {
      method: 'PUT', body: { meta: strapiMeta },
    })
  };

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
    };
    return await client(`order-metas/${orderMetaId}/shipping`, {
      method: 'PUT', body: {
        meta: {
          order: meta.order, ...strapiMeta,
        },
      },
    })
  };

  const updateShippingCoverage = async (metaId: number, newShippingCoverage: SubscriptionCoverage) => {
    return await client(`order-metas/${metaId}/transportShipping`, {
      method: 'PUT',
      body: newShippingCoverage,
    })
  };

  const getAmount = async (payload: GetAmountPayload): Promise<any> => {
    const strapiItems = payload.items.map((item: OrderItem) => useStrapiOrderItemFactory(item));
    return await client('orders/total', { method: 'POST', body: { items: strapiItems, orderId: payload.orderId } })
  };

  const getFirstPaidOrder = async (): Promise<Order> => {
    return await client('orders/firstPaidOrder', { method: 'GET' })
  };

  return {
    addOrderCoupon,
    addOrderReview,
    createOrder,
    createOrderItemReview,
    discardOrder,
    findByNotification,
    findOrdersByUser,
    findById,
    getAmount,
    getFirstPaidOrder,
    removeOrderCoupon,
    updateOrderItem,
    updateOrderShipping,
    updateOrderBilling,
    updateShippingCoverage,
  }
};
