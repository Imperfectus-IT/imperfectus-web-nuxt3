export const useOrderRepository = (t: any) => {
  const findOrdersByUser = async ():Promise<Order[]> => {
    const { find } = useStrapi();
    const user = useStrapiUser();
    const strapiOrders = await find('orders', {user: user.value?.id, _sort: 'created_at:desc', _limit: 10 });
    const orders:Order[] = strapiOrders.map((order: any) => useOrdersFactory(order, t));
    return orders
  };
  
  return {
    findOrdersByUser
  }
};