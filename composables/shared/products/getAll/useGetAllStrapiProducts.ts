export const useGetAllStrapiProducts = () => {
  const { findProducts } = useStrapiProductRepository()
  const { setProducts } = useLocalStorageProductRepository()

  const executeGetAllProducts = async () => {
    const query = {
      _sort: 'name_es:ASC',
    }
    const products: Array<Product | undefined> = await findProducts(query)
    setProducts(products)
    return products
  }

  return {
    executeGetAllProducts,
  }
}
