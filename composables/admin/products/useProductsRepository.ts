export const useProductsRepository = () => {
  const getProducts = async () => {
    const { find } = useStrapi();
    const activeProducts = await find('products', { isActive: true, _sort: 'name_es:ASC' });
    const inactiveProducts = await find('products', { isActive: false });
    const strapiProducts = [...activeProducts, ...inactiveProducts];

    const products: Products = {
      itemProducts: {
        fruits: strapiProducts
                  .filter((product: any) => product.itemType === 'fruit' || product.itemType === 'fruitAndVegetable')
                  .map((product: any) => useProductsFactory(product).itemProductFactory()),
        vegetables: strapiProducts
                      .filter((product: any) => product.itemType === 'vegetable' || product.itemType === 'fruitAndVegetable')
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