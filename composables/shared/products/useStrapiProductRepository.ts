export const useStrapiProductRepository = () => {
  const { find } = useStrapi()
  const findProducts = async (query: ProductQuery): Promise<ProductsState> => {
    const strapiProducts = await find<StrapiProduct[]>('products', { ...query, isActive: 'all' })
    return {
      itemProducts: strapiProducts.filter(product => product.type === 'item').map(product => useProductFactory().createItemProduct(product)),
      boxProducts: strapiProducts.filter(product => product.type === 'box').map(product => useProductFactory().createBoxProduct(product)),
    }
  }

  return {
    findProducts,
  }
}
