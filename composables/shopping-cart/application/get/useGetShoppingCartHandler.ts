export const useGetShoppingCartHandler = () => {
  const { shoppingCart, executeGetShoppingCart } = useGetShoppingCart()

  onMounted(() => {
    executeGetShoppingCart()
  })

  return {
    shoppingCart,
  }
}
