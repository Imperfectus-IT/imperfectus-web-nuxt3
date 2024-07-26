export const useSetPreferredProductsHandler = () => {
  const { executeSetPreferredProducts } = useSetPreferredProducts()
  const setPreferredProductsHandler = async (userId: number, preferredProducts: PreferredProducts) => {
    await executeSetPreferredProducts(userId, preferredProducts)
  }
  return {
    setPreferredProductsHandler,
  }
}
