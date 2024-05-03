export interface Products {
  itemProducts: {
    fruits: ItemProduct[],
    vegetables: ItemProduct[],
  },
  boxProducts: BoxProduct[]
}

export interface ItemProduct {
  id: number,    
  name: string,
  type: string, 
  itemType: string
}

export interface BoxProduct {
  id: number,
  name: string,
  type: string,
  itemType: string,
  boxType: string,
  sku: string,
  amount: number,
}