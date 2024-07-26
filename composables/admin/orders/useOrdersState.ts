export const useOrdersState = () => {
  const orders: Ref<Order[]> = useState('orders', () => [])
  const order: Ref<Order | null> = useState('order', () => null)
  return {
    orders,
    order,
  }
}
