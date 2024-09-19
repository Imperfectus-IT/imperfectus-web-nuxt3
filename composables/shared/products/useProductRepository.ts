export const useProductRepository = () => {
  const findProducts = async (): Promise<ProductsState> => {
    const products = await $fetch('/api/v1/products')
    console.log(products)
    return {
      itemProducts: products.filter(product => product.type === 'item'),
      boxProducts: products.filter(product => product.type === 'box'),
    }
  }

  return {
    findProducts,
  }
}
