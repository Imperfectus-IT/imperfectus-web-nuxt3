export const useShoppingCartBoxStep = () => {
  const { shoppingCart } = useShoppingCartState()
  const { locale } = useI18n()
  const { makeProductBox } = useProductFactory()
  const { boxProductBySize } = useProductCatalog()

  const setBoxSize = (boxSize: string) => {
    shoppingCart.value.currentItem.boxSize = boxSize
  }

  const addBoxProduct = () => {
    shoppingCart.value.currentItem.boxProduct = makeProductBox(boxProductBySize[shoppingCart.value.currentItem.boxSize].value, locale.value)
  }
  const resetBoxProduct = () => {
    shoppingCart.value.currentItem.boxProduct = null
    shoppingCart.value.currentItem.boxSize = null
  }

  const onSetBoxSize = (boxSize: string) => {
    setBoxSize(boxSize)
    addBoxProduct()
  }

  return {
    onSetBoxSize,
  }
}
