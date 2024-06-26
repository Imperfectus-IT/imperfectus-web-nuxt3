import type { Product } from '~/composables/shared/product/types/Product.ts'

export type BillingAddress = {
  billingFirstName: string
  billingLastName: string
  billingEmail: string
  billingPhone: string
  billingAddress: string
  billingAddress2: string
  billingPostalCode: string
  billingCity: string
  billingState: string
  billingNif: string
  billingCountry: string
}

export type ShippingAddress = {
  shippingFirstName: string
  shippingLastName: string
  shippingEmail: string
  shippingPhone: string
  shippingAddress: string
  shippingPostalCode: string
  shippingCity: string
  shippingState: string
  shippingCountry: string
}

export type Item = {
  amount: number
  sku: string
  exclusions: string[]
  image: string
}

export type ShoppingCart = {
  status: string
  boxSize: string
  boxType: string
  boxProductSelected: Product | null
  purchaseType: string
  step: string
  deliveryDate: string
  deliveryHour: string
  preferredDay: string
  preferredHour: string
  coverage?: string | null
  frequency: string
  items: Item[]
  billingAddress: BillingAddress
  shippingAddress: ShippingAddress
}
