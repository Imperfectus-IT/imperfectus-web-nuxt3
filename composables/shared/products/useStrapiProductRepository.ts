export const useStrapiProductRepository = () => {
  const { find } = useStrapi()
  const findProducts = async (query: ProductQuery): Promise<ProductsState> => {
    const products = await find<StrapiProduct[]>('products', { ...query, isActive: 'all' })
    return {
      itemProducts: products.filter(product => product.type === 'item'),
      boxProducts: products.filter(product => product.type === 'box'),
    }
  }

  return {
    findProducts,
  }
}
