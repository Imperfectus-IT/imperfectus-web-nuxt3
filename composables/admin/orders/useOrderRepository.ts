export const useOrderRepository = (t: any) => {
  const findOrdersByUser = async (): Promise<Order[]> => {
    const { find } = useStrapi()
    const user = useStrapiUser()
    const strapiOrders = await find('orders', { user: user.value?.id, _sort: 'created_at:desc', _limit: 10 })
    const orders: Order[] = strapiOrders.map((order: any) => useOrdersFactory(order, t))
    return orders
  }

  const findById = async (id: number): Promise<Order> => {
    const { find } = useStrapi()
    const [order] = await find<Array<Order>>('orders', { id })
    return order
  }

  return {
    findOrdersByUser,
    findById,
  }
}
