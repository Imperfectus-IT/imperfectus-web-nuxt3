export const useLocalStorageProductRepository = () => {
  const { getItem, setItem } = useLocalStorage()
  const productsKey = 'products'

  const activeBoxProducts = (): Array<Product> => getItem(productsKey)?.filter((product: Product) => product.type === BOX_PRODUCT_TYPE && product.isActive) || []
  const activeItemProducts = (): Array<Product> => getItem(productsKey)?.filter((product: Product) => product.type === ITEM_PRODUCT_TYPE && product.isActive) || []
  const fruitsItemProducts = (): Array<Product> => getItem(productsKey)?.filter((product: Product) => product.itemType === FRUIT_ITEM_PRODUCT_TYPE) || []
  const vegetablesItemProducts = (): Array<Product> => getItem(productsKey)?.filter((product: Product) => product.itemType === VEGETABLE_ITEM_PRODUCT_TYPE) || []
  const itemProducts = (): Array<Product> => getItem(productsKey)?.filter((product: Product) => product.type === ITEM_PRODUCT_TYPE) || []
  const activeFruitsItemProducts = (): Array<Product> => activeItemProducts().filter((product: Product) => product.itemType === FRUIT_ITEM_PRODUCT_TYPE || product.itemType === FRUIT_VEGETABLE_ITEM_PRODUCT_TYPE) || []
  const activeVegetablesItemProducts = (): Array<Product> => activeItemProducts().filter((product: Product) => product.itemType === VEGETABLE_ITEM_PRODUCT_TYPE || product.itemType === FRUIT_VEGETABLE_ITEM_PRODUCT_TYPE) || []
  const setProducts = (products: Array<Product | undefined>) => setItem(productsKey, products)
  return {
    activeBoxProducts,
    activeItemProducts,
    fruitsItemProducts,
    itemProducts,
    activeFruitsItemProducts,
    activeVegetablesItemProducts,
    setProducts,
    vegetablesItemProducts,
  }
}
