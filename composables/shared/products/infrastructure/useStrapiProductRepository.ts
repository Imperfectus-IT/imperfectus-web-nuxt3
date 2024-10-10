import useProductFactory from '~/composables/shared/products/infrastructure/useProductFactory.ts'

export const useStrapiProductRepository = () => {
  const { find } = useStrapi()
  const { createBoxProduct, createItemProduct } = useProductFactory()
  const findProducts = async (): Promise<ProductsState> => {
    const strapiProducts = await find<StrapiProduct[]>('products', { isActive: 'all' })

    return {
      itemProducts: strapiProducts.filter(product => product.type === 'item').map(product => createItemProduct(product)),
      boxProducts: strapiProducts.filter(product => product.type === 'box').map(product => createBoxProduct(product)),
    }
  }

  return {
    findProducts,
  }
}
