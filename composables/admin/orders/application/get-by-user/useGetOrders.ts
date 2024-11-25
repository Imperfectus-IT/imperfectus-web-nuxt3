import type { ComposerTranslation } from 'vue-i18n'

export const useGetOrders = (t: ComposerTranslation) => {
  const { orders } = useOrdersState();
  const { findOrdersByUser } = useOrderRepository(t);

  const executeGetOrdersByUser = async () => {
    orders.value = await findOrdersByUser()
  };

  return {
    executeGetOrdersByUser,
    orders,
  }
};
