export const useShoppingCartBoxStep = () => {
  const { shoppingCart } = useShoppingCartState()
  const { activeBoxProducts } = useProductsState()

  const onSetBoxSize = (boxSize: string) => {
    shoppingCart.value.currentItem.boxSize = boxSize
    shoppingCart.value.currentItem.product = activeBoxProducts.value.find((boxProduct: BoxProduct) => {
      return boxProduct.boxType === shoppingCart.value.currentItem.boxType && boxProduct.sku === boxSize
    })
    shoppingCart.value.currentItem.amount = shoppingCart.value.currentItem.product.price
  }

  return {
    onSetBoxSize,
  }
}
