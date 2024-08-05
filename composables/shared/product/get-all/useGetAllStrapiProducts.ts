import type { Product } from '~/composables/shared/product/types/Product.ts'

export const useGetAllStrapiProducts = () => {
  const { findProducts } = useStrapiProductRepository()
  // const { setProducts } = useLocalStorageProductRepository()
  const { products } = useProductsState()

  const executeGetAllProducts = async () => {
    const query = {
      _sort: 'name_es:ASC',
    }
    const strapiProducts: Array<Product> = await findProducts(query)
    products.value = strapiProducts
  }

  return {
    executeGetAllProducts,
  }
}
