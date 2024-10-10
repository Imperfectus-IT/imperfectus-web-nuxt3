import { createProductDetail } from '~/composables/shopping-cart/domain/Product.ts'

export const useShoppingCartBoxStep = () => {
  const { shoppingCart } = useShoppingCartState()
  const { locale } = useI18n()
  const { boxProductBySize } = useProductCatalog()

  const setBoxSize = (boxSize: string) => {
    shoppingCart.value.currentItem.boxSize = boxSize
  }

  const addBoxProduct = () => {
    console.log(boxProductBySize)
    // shoppingCart.value.currentItem.product = createProductDetail(boxProductBySize[shoppingCart.value.currentItem.boxSize].value, locale.value)
  }

  const onSetBoxSize = (boxSize: string) => {
    setBoxSize(boxSize)
    addBoxProduct()
  }

  return {
    onSetBoxSize,
  }
}
