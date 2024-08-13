export const useGetAllStrapiProducts = () => {
  const { findProducts } = useStrapiProductRepository()
  const { products } = useProductsState()

  const executeGetAllProducts = async () => {
    const query = {
      _sort: 'name_es:ASC',
    }
    products.value = await findProducts(query)
    // setProducts(products.value)
    return products
  }

  return {
    executeGetAllProducts,
  }
}
