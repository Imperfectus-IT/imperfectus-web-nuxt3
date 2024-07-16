import type { ComposerTranslation } from 'vue-i18n'

export const useGetOrder = (t: ComposerTranslation) => {
  const { order } = useOrdersState()

  const { findById } = useOrderRepository(t)

  const executeGetOrder = async (id: number) => {
    console.info('executeGetOrder', id)
    order.value = await findById(id)
  }

  return {
    executeGetOrder,
    order,
  }
}
