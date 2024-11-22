import type { ComposerTranslation } from 'vue-i18n'

export const useGetOrderById = (t: ComposerTranslation) => {
  const { order } = useOrdersState()

  const { findById } = useOrderRepository(t)

  const executeGetOrder = async (id: number) => {
    order.value = await findById(id)
  }

  return {
    executeGetOrder,
    order,
  }
}
