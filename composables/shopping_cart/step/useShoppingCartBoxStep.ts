import {
  S_PRODUCT_TYPE,
  IM_PRODUCT_TYPE,
  XL_PRODUCT_TYPE,
  SMALL_BOX_SIZE, MEDIUM_BOX_SIZE, XLARGE_BOX_SIZE,
} from '~/composables/shared/product/types/ProductConstants'

export const useShoppingCartBoxStep = () => {
  const { executeGetAllProducts } = useGetAllStrapiProducts()
  const { activeBoxProducts } = useInMemoryProductRepository()
  const { shoppingCart } = useShoppingCartState()
  const { locale } = useI18n()

  const orderBoxProductBySize = {
    [SMALL_BOX_SIZE]: computed(() => activeBoxProducts().find(product => product.SKU === S_PRODUCT_TYPE)),
    [MEDIUM_BOX_SIZE]: computed(() => activeBoxProducts().find(product => product.SKU === IM_PRODUCT_TYPE)),
    [XLARGE_BOX_SIZE]: computed(() => activeBoxProducts().find(product => product.SKU === XL_PRODUCT_TYPE)),
  }

  const setBoxSize = (boxSize: string) => {
    shoppingCart.value.currentItem.boxSize = boxSize
  }

  const addBoxProduct = () => {
    shoppingCart.value.currentItem.boxProduct = {
      id: orderBoxProductBySize[shoppingCart.value.currentItem.boxSize]?.value?.id,
      sku: orderBoxProductBySize[shoppingCart.value.currentItem.boxSize]?.value.SKU,
      price: orderBoxProductBySize[shoppingCart.value.currentItem.boxSize]?.value.price,
      name: orderBoxProductBySize[shoppingCart.value.currentItem.boxSize]?.value[`name_${locale.value}`],
      description: orderBoxProductBySize[shoppingCart.value.currentItem.boxSize]?.value[`description_${locale.value}`],
      image: `/images/boxes/Caja-${orderBoxProductBySize[shoppingCart.value.currentItem.boxSize]?.value.SKU}-empty.webp`,
    }
  }

  const onSetBoxSize = (boxSize: string) => {
    setBoxSize(boxSize)
    addBoxProduct()
  }

  onMounted(async () => {
    await executeGetAllProducts()
  })

  return {
    onSetBoxSize,
  }
}
