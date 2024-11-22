import type { ComposerTranslation } from 'vue-i18n'

export const useGetOrderByOrderId = (t: ComposerTranslation) => {
  const { order } = useOrdersState()

  const { findByOrderId } = useOrderRepository(t)

  const executeGetOrderByOrderId = async (id: number) => {
    order.value = await findByOrderId(id)
  }

  return {
    executeGetOrderByOrderId,
    order,
  }
}
