import type { ComposerTranslation } from 'vue-i18n'

export const useGetOrder = (t: ComposerTranslation) => {
  const { order } = userOrderState()
  const { findOrderByOrderId } = useOrderRepository(t)

  const executeGetOrder = async (id: number) => {
    order.value = await findOrderByOrderId(id)
  }

  return {
    order,
    executeGetOrder,
  }
}
