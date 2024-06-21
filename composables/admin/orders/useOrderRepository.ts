import type { ComposerTranslation } from 'vue-i18n'

export const useOrderRepository = (t: ComposerTranslation) => {
  const findOrdersByUser = async (): Promise<Order[]> => {
    const { find } = useStrapi()
    const user = useStrapiUser()
    const strapiOrders = await find('orders', { user: user.value?.id, _sort: 'created_at:desc', _limit: 10 })
    return strapiOrders.map((order: any) => useOrdersFactory(order, t))
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
