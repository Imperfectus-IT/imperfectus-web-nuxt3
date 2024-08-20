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
