import type { BoxProduct, ItemProduct } from '~/composables/shared/products/domain/Product.ts'

export default function () {
  const products: Ref<ProductsState> = useState('products', () => ({
    itemProducts: [],
    boxProducts: [],
  }))
  const activeBoxProducts = computed(() => products.value.boxProducts.filter((product: BoxProduct) => product.type === BOX_PRODUCT_TYPE && product.isActive))
  const activeItemProducts = computed(() => products.value.itemProducts.filter((product: ItemProduct) => product.type === ITEM_PRODUCT_TYPE && product.isActive))
  const fruitsItemProducts = computed(() => products.value.itemProducts.filter((product: ItemProduct) => product.itemType === FRUIT_ITEM_PRODUCT_TYPE))
  const vegetablesItemProducts = computed(() => products.value.itemProducts.filter((product: ItemProduct) => product.itemType === VEGETABLE_ITEM_PRODUCT_TYPE))
  const activeFruitsItemProducts = computed(() => fruitsItemProducts.value.filter((product: ItemProduct) => product.isActive))
  const activeVegetablesItemProducts = computed(() => vegetablesItemProducts.value.filter((product: ItemProduct) => product.isActive))
  return {
    products,
    activeBoxProducts,
    activeFruitsItemProducts,
    activeItemProducts,
    activeVegetablesItemProducts,
    fruitsItemProducts,
    vegetablesItemProducts,
  }
}

export type ProductsState = {
  itemProducts: ItemProduct[]
  boxProducts: BoxProduct[]
}
