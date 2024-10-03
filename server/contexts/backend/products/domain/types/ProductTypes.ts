export type RootProduct = {
  id: number
  nameEs: string
  nameCa: string
  isImperfectusProduct: boolean
  image: string | string[]
  type: string
  isActive: boolean
}

export type ItemProductType = RootProduct & {
  itemType: string
}

export type BoxProductType = RootProduct & {
  weight: number
  sku: string
  descriptionEs: string
  descriptionCa: string
  boxType: string
  price: number
  frequency: string
}
