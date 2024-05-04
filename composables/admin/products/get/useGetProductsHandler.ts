export const useGetProductsHandler = () => {
  const { executeGetProducts, products } = useGetProducts()

  onMounted(async () => {
    await executeGetProducts()
  })

  return {
    products,
  }
}
