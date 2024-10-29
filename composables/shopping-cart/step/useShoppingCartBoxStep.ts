export const useShoppingCartBoxStep = () => {
  const { shoppingCart } = useShoppingCartState()
  const { activeBoxProducts } = useProductsState()

  const onSetBoxSize = (boxSize: string) => {
    if (shoppingCart.value.currentItem.boxType === VEGETABLES_BOX_TYPE || shoppingCart.value.currentItem.boxType === FRUITS_BOX_TYPE) {
      const { boxType } = shoppingCart.value.currentItem
      shoppingCart.value.currentItem.boxSize = boxType === VEGETABLES_BOX_TYPE ? boxSize.concat('VG') : boxSize.concat('FR')
    }
    else {
      shoppingCart.value.currentItem.boxSize = boxSize
    }
    shoppingCart.value.currentItem.product = activeBoxProducts.value
      .find((boxProduct: BoxProduct) => {
        return boxProduct.boxType === shoppingCart.value.currentItem.boxType && boxProduct.sku === shoppingCart.value.currentItem.boxSize
      })
    shoppingCart.value.currentItem.amount = shoppingCart.value.currentItem.product.price
  }

  return {
    onSetBoxSize,
  }
}
