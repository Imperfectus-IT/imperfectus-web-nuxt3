import type { ComposerTranslation } from 'vue-i18n'

export const useGetOrderByOrderIdHandler = (orderId: number, t: ComposerTranslation) => {
  const { order, executeGetOrderByOrderId } = useGetOrderByOrderId(t)

  onMounted(async () => {
    await executeGetOrderByOrderId(orderId)
  })

  return {
    order,
    executeGetOrderByOrderId,
  }
}
