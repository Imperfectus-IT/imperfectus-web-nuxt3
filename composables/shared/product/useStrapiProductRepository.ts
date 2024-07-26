export const useStrapiProductRepository = () => {
  const findProducts = async (query: ProductQuery): Promise<Product[]> => {
    const { find } = useStrapi()
    return await find<Product[]>('products', query)
  }

  return {
    findProducts,
  }
}
