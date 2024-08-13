export const useProductsState = () => {
  const products: Ref<Product[]> = useState('products', () => [])
  const activeBoxProducts = computed(() => products.value.filter((product: Product) => product.type === BOX_PRODUCT_TYPE && product.isActive))
  const activeItemProducts = computed(() => products.value.filter((product: Product) => product.type === ITEM_PRODUCT_TYPE && product.isActive))
  const fruitsItemProducts = computed(() => products.value.filter((product: Product) => product.itemType === FRUIT_ITEM_PRODUCT_TYPE))
  const vegetablesItemProducts = computed(() => products.value.filter((product: Product) => product.itemType === VEGETABLE_ITEM_PRODUCT_TYPE))
  const itemProducts = computed(() => products.value.filter((product: Product) => product.type === ITEM_PRODUCT_TYPE))
  const activeFruitsItemProducts = computed(() => activeItemProducts.value.filter((product: Product) => product.itemType === FRUIT_ITEM_PRODUCT_TYPE || product.itemType === FRUIT_VEGETABLE_ITEM_PRODUCT_TYPE))
  const activeVegetablesItemProducts = computed(() => activeItemProducts.value.filter((product: Product) => product.itemType === VEGETABLE_ITEM_PRODUCT_TYPE || product.itemType === FRUIT_VEGETABLE_ITEM_PRODUCT_TYPE))

  return {
    products,
    activeBoxProducts,
    activeFruitsItemProducts,
    activeItemProducts,
    activeVegetablesItemProducts,
    fruitsItemProducts,
    itemProducts,
    vegetablesItemProducts,
  }
}
