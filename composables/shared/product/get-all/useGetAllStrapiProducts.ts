export const useGetAllStrapiProducts = () => {
  const { products } = useProductState()
  const { findProducts } = useStrapiProductRepository()

  const executeGetAllProducts = async () => {
    const query = {
      _sort: 'name_es:ASC',
    }
    products.value = await findProducts(query)
  }

  return {
    executeGetAllProducts,
  }
}
