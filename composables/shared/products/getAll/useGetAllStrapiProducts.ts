export const useGetAllStrapiProducts = () => {
  const { findProducts } = useProductRepository()
  const { products } = useProductsState()

  const executeGetAllProducts = async () => {
    const query = {
      _sort: 'name_es:ASC',
    }
    const allProducts = await findProducts(query)
    products.value.boxProducts = allProducts.boxProducts
    products.value.itemProducts = allProducts.itemProducts
  }

  return {
    executeGetAllProducts,
  }
}
