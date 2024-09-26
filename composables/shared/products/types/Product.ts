type BaseProduct = {
  id: number
  name_es: string
  name_ca: string
  isImperfectusProduct: boolean
  image: string | string[]
  type: string
  isActive: boolean
}

export type ItemProduct = BaseProduct & {
  itemType: string
}

export type BoxProduct = BaseProduct & {
  weight: number
  description_es: string
  description_ca: string
  boxType: string
  price: number
}

export type ProductsState = {
  itemProducts: ItemProduct[]
  boxProducts: BoxProduct[]
}

export const S_PRODUCT_TYPE = 'S'
export const IM_PRODUCT_TYPE = 'IM'
export const XL_PRODUCT_TYPE = 'XL'
export const SMALL_BOX_SIZE = 'small'
export const MEDIUM_BOX_SIZE = 'medium'
export const XLARGE_BOX_SIZE = 'xlarge'
export const MIXED_BOX_TYPE = 'mixed'
export const FRUITS_BOX_TYPE = 'fruits'
export const VEGETABLES_BOX_TYPE = 'vegetables'
export const STONE_FRUITS_BOX_TYPE = 'stone_fruits'
export const BOX_PRODUCT_TYPE = 'box'
export const ITEM_PRODUCT_TYPE = 'item'
export const FRUIT_ITEM_PRODUCT_TYPE = 'fruit'
export const VEGETABLE_ITEM_PRODUCT_TYPE = 'vegetable'
export const FRUIT_VEGETABLE_ITEM_PRODUCT_TYPE = 'fruitAndVegetable'
