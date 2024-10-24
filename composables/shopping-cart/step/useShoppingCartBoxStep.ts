import { createProductDetail } from '~/composables/shopping-cart/domain/Product.ts'

export const useShoppingCartBoxStep = () => {
  const { shoppingCart } = useShoppingCartState()
  const { locale } = useI18n()
  const { boxProductBySize } = useProductCatalog()
  const { activeBoxProducts } = useProductsState()
  const { generateSku } = useGenerateSku()

  const setBoxSize = (boxSize: string) => {
    shoppingCart.value.currentItem.boxSize = boxSize
    const sku = generateSku(shoppingCart.value.currentItem.boxType, boxSize)
    console.log('SKU', sku)
    shoppingCart.value.currentItem.product = activeBoxProducts.value.find((boxProduct: BoxProduct) => {
      return boxProduct.boxType === shoppingCart.value.currentItem.boxType && boxProduct.sku === boxSize
    })
    console.log(shoppingCart.value.currentItem.sku)
  }

  const addBoxProduct = () => {
    console.log(boxProductBySize)
    // shoppingCart.value.currentItem.product = createProductDetail(boxProductBySize[shoppingCart.value.currentItem.boxSize].value, locale.value)
  }

  const onSetBoxSize = (boxSize: string) => {
    setBoxSize(boxSize)
    // addBoxProduct()
  }

  return {
    onSetBoxSize,
  }
}
