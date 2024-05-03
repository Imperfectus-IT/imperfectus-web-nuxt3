export const useProductsRepository = () => {
  const getProducts = async () => {
    const { find } = useStrapi();
    const strapiProducts = await find('products', {
      _limit: -1,
    });

    const products: Products = {
      itemProducts: {
        fruits: strapiProducts
                  .filter((product: any) => product.itemType === 'fruit')
                  .map((product: any) => useProductsFactory(product).itemProductFactory()),
        vegetables: strapiProducts
                      .filter((product: any) => product.itemType === 'vegetable')
                      .map((product: any) => useProductsFactory(product).itemProductFactory()),
        },
        boxProducts: strapiProducts
                      .filter((product: any) => product.type === 'box')
                      .map((product: any) => useProductsFactory(product).boxProductFactory()),
    }
    return products
  }
  return {
    getProducts
  }
}