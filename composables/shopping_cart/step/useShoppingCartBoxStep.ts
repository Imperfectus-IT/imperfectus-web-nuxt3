export const useShoppingCartBoxStep = () => {
  const { activeBoxProducts } = useLocalStorageProductRepository()
  const { shoppingCart } = useShoppingCartState()
  const { locale } = useI18n()
  const { makeProductBox } = useProductFactory()

  const orderBoxProductBySize = {
    [SMALL_BOX_SIZE]: computed(() => activeBoxProducts().find(product => product.SKU === S_PRODUCT_TYPE)),
    [MEDIUM_BOX_SIZE]: computed(() => activeBoxProducts().find(product => product.SKU === IM_PRODUCT_TYPE)),
    [XLARGE_BOX_SIZE]: computed(() => activeBoxProducts().find(product => product.SKU === XL_PRODUCT_TYPE)),
  }

  const setBoxSize = (boxSize: string) => {
    shoppingCart.value.currentItem.boxSize = boxSize
  }

  const addBoxProduct = () => {
    shoppingCart.value.currentItem.boxProduct = makeProductBox(orderBoxProductBySize[shoppingCart.value.currentItem.boxSize].value, locale.value)
  }

  const onSetBoxSize = (boxSize: string) => {
    setBoxSize(boxSize)
    addBoxProduct()
  }

  return {
    onSetBoxSize,
  }
}
