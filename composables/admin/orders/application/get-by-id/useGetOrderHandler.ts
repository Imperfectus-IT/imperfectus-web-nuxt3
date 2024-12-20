import type { ComposerTranslation } from 'vue-i18n'

export const useGetOrderHandler = (orderId: number, t: ComposerTranslation) => {
  const { order, executeGetOrder } = useGetOrderById(t)

  onMounted(async () => {
    await executeGetOrder(orderId)
  })

  return {
    order,
    executeGetOrder,
  }
}
