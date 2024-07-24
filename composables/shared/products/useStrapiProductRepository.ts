export const useStrapiProductRepository = () => {
  const findProducts = async (query: ProductQuery): Promise<Partial<Product[]>> => {
    const { find } = useStrapi()
    return await find<Product[]>('products', query)
  }

  return {
    findProducts,
  }
}
