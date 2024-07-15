export interface Products {
  itemProducts: {
    fruits: ItemProduct[]
    vegetables: ItemProduct[]
  }
  boxProducts: BoxProduct[]
}

export interface ItemProduct {
  id: number
  name_es: string
  name_ca: string
  type: string
  itemType: string
  image: string
  isActive: boolean
}

export interface BoxProduct {
  id: number
  name: string
  type: string
  itemType: string
  boxType: string
  sku: string
  amount: number
  weight: number
}
