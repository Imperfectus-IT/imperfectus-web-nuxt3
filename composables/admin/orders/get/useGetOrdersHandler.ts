import type { ComposerTranslation } from 'vue-i18n'

export const useGetOrdersHandler = (t: ComposerTranslation) => {
  const { executeGetOrdersByUser, orders } = useGetOrders(t)

  onMounted(async () => {
    await executeGetOrdersByUser()
  })

  return {
    orders,
  }
}
