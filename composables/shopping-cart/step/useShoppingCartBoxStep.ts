export const useShoppingCartBoxStep = () => {
  const { shoppingCart } = useShoppingCartState()
  const { activeBoxProducts } = useProductsState()
  const { generateSku } = useGenerateSku()
  const onSetBoxSize = (boxSize: string) => {
    if (shoppingCart.value.currentItem) {
      shoppingCart.value.currentItem.boxSize = boxSize
      const newSku = generateSku(shoppingCart.value.currentItem.boxType, shoppingCart.value.currentItem.boxSize, shoppingCart.value.currentItem.frequency as string)
      shoppingCart.value.currentItem.product = activeBoxProducts.value
        .find((boxProduct: BoxProduct) => {
          return boxProduct.boxType === shoppingCart.value.currentItem.boxType && boxProduct.sku === newSku
        })
      shoppingCart.value.currentItem.amount = shoppingCart.value.currentItem.product?.price ?? 0
    }
  }

  return {
    onSetBoxSize,
  }
}
