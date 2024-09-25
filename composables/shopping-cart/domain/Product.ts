export type Product = {
  id?: number
  sku?: string
  price: number
  name_ca: string
  name_es: string
  description_ca: string
  description_es: string
  boxType?: string
  itemType?: string
  type: string
  frequency?: string
  images: string[]
}

export function isBoxProduct({ boxType }: Product): boolean {
  return boxType === 'box'
}
