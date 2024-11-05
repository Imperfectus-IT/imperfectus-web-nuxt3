export type StrapiProduct = {
  id?: number
  SKU: string
  weight: number
  price: number
  isImperfectusProduct: boolean
  name_ca: string
  name_es: string
  description_ca: string
  description_es: string
  content_ca: string | null
  content_es: string | null
  isActive: boolean
  frequency: string
  type: string
  priceType: string
  boxType: string
  itemType: string
  unitPrice: any
  units: any
  imagePath: string[]
  tax_id: StrapiTax
}

type StrapiTax = {
  id: number
  name: string
  type: string
  amount_type: string
  amount: number
  amount_value: number
  country_code: string
}
