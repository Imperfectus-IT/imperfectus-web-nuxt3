// export const useLocalStorageProductRepository = () => {
//   const { getItem, setItem } = useLocalStorage()
//   const productsKey = 'products'
//
//   const activeBoxProducts = (): Array<StrapiProduct> => getItem(productsKey)?.filter((product: StrapiProduct) => product.type === BOX_PRODUCT_TYPE && product.isActive) || []
//   const activeItemProducts = (): Array<StrapiProduct> => getItem(productsKey)?.filter((product: StrapiProduct) => product.type === ITEM_PRODUCT_TYPE && product.isActive) || []
//   const itemProducts = (): Array<StrapiProduct> => getItem(productsKey)?.filter((product: StrapiProduct) => product.type === ITEM_PRODUCT_TYPE) || []
//   const activeFruitsItemProducts = (): Array<StrapiProduct> => activeItemProducts().filter((product: StrapiProduct) => product.itemType === FRUIT_ITEM_PRODUCT_TYPE || product.itemType === FRUIT_VEGETABLE_ITEM_PRODUCT_TYPE) || []
//   const activeVegetablesItemProducts = (): Array<StrapiProduct> => activeItemProducts().filter((product: StrapiProduct) => product.itemType === VEGETABLE_ITEM_PRODUCT_TYPE || product.itemType === FRUIT_VEGETABLE_ITEM_PRODUCT_TYPE) || []
//   const setProducts = (products: Array<StrapiProduct | undefined>) => setItem(productsKey, products)
//   return {
//     activeBoxProducts,
//     activeItemProducts,
//     itemProducts,
//     activeFruitsItemProducts,
//     activeVegetablesItemProducts,
//     setProducts,
//   }
// }
