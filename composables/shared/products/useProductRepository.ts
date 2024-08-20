export const useProductRepository = () => {
  const { find } = useStrapi()
  const findProducts = async (query: ProductQuery): Promise<ProductsState> => {
    const activeStrapiProducts = await find<StrapiProduct[]>('products', { ...query, isActive: true })
    const inactiveStrapiProducts = await find<StrapiProduct[]>('products', { ...query, isActive: false })
    const strapiProducts = [...activeStrapiProducts, ...inactiveStrapiProducts]
    return {
      itemProducts: strapiProducts.filter(product => product.type === 'item').map(product => useProductFactory().createItemProduct(product)),
      boxProducts: strapiProducts.filter(product => product.type === 'box').map(product => useProductFactory().createBoxProduct(product)),
    }
  }

  return {
    findProducts,
  }
}
