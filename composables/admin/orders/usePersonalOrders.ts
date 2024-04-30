import type { Order } from './OrderType'


export const usePersonalOrders = async () => {
  const user = useStrapiUser();
  const { find } = useStrapi();
  const orders = await find("orders", {
      user: user.value?.id,
      _sort: "created_at:desc",
      _limit: -1,
    });

  const personalOrders: Order[] = orders.map((order) => {
    return {
      id: order.id,
      order_id: order.order_id,
      status: order.status,
      deliveryDate: order.deliveryDate,
      sku: order.order_items[0].product.SKU,
      amount: order.order_items[0].amount,
      exclusions: order.order_items[0].exclusions
    }
  })
  return personalOrders
};