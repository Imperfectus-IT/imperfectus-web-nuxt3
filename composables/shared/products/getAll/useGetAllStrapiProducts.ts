export const useGetAllStrapiProducts = () => {
  const { findProducts } = useProductRepository()
  const { products } = useProductsState()

  const executeGetAllProducts = async () => {
    const allProducts = await findProducts()
    products.value.boxProducts = allProducts.boxProducts
    products.value.itemProducts = allProducts.itemProducts
  }

  return {
    executeGetAllProducts,
  }
}
