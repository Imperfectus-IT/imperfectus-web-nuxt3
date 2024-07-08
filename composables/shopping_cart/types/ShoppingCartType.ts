import type { Product } from '~/composables/shared/product/types/Product.ts'

export type BillingAddress = {
  firstname: string
  lastname: string
  email: string
  phone: string
  company: string
  address1: string
  address2: string
  postalCode: string
  city: string
  state: string
  cif: string
  country: string
}

export type ShippingAddress = {
  firstname: string
  lastname: string
  email: string
  phone: string
  company: string
  address1: string
  address2: string
  postalCode: string
  city: string
  state: string
  country: string
  notes: string
}

export type Item = {
  id: string
  amount: number
  exclusions: Product[]
  image: string
  product: Product | null
  purchaseType: string
  frequency?: string
  quantity: number
}

export type ShoppingCart = {
  status: string
  step: string
  deliveryDate: string
  deliveryHour: string
  preferredDay: string
  preferredHour: string
  invoiceRequired: boolean
  coverage?: string | null
  items: Item[]
  currentItem: Item | null
  billingAddress: BillingAddress
  shippingAddress: ShippingAddress
}
