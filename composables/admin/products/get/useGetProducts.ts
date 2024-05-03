export const useGetProducts = () => {
  const { products } = useProductsState()
  const { getProducts } = useProductsRepository()

  const executeGetProducts = async () => {
    products.value = await getProducts()
  }

  return {
    products,
    executeGetProducts,
  }
}
