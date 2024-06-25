import type { ComposerTranslation } from 'vue-i18n'

export const useOrderRepository = (t: ComposerTranslation) => {
  const findOrdersByUser = async (): Promise<Order[]> => {
    const { find } = useStrapi()
    const user = useStrapiUser()
    const strapiOrders = await find('orders', {
      user: user.value?.id,
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

  const updateOrder = async (orderId: string, order: Order) => {
    const { update } = useStrapi()
    return await update('orders', orderId, order)
  }

  return {
    findOrdersByUser,
    findById,
    updateOrder,
  }
}
