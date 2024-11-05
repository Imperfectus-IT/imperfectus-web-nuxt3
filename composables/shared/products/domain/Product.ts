type BaseProduct = {
  id?: number
  nameEs: string
  nameCa: string
  isImperfectusProduct: boolean
  image: string
  type: string
  isActive: boolean
}

export type ItemProduct = BaseProduct & {
  itemType: string
}

export type BoxProduct = BaseProduct & {
  weight: number
  descriptionEs: string
  descriptionCa: string
  boxType: string
  price: number
  priceWithTax: number
  sku: string
  tax: number
  allImages: string[]
}
