import {} from '@/composables/'

export type StrapiOrder = {
  id: number
  order_id: number
  user: StrapiUser
  status: string
  deliveryDate: string
  deliveryHour: string | null
  orderReview: string | null
  discarded: boolean
  order_items: StrapiOrderItem[]
  given: object[]
  order_meta: StrapiOrderMeta
  preferredHour: string
  coupon: object | null
  payment: object | number
}

export interface StrapiOrderItem {
  id: number
  product: object
  quantity: number
  status: string
  amount: number
  subscription: number
  weight: number
  image: string | string[]
  deliveryDate: string | null
  notes: string | null
  coupon_id: object
  exclusions: unknown[]
  trackingUrl: string | null
  trackingId: string | null
}

export type StrapiOrderMeta = {
  id: number
  billing_firstname: string
  billing_lastname: string
  billing_address1: string
  billing_address2: string | null
  billing_city: string
  billing_state: string
  billing_country: string
  billing_postcode: string
  billing_company: string | null
  billing_phone: string
  billing_email: string
  shipping_notes: string | null
  shipping_firstname: string
  shipping_lastname: string
  shipping_address1: string
  shipping_address2: string | null
  shipping_city: string
  shipping_state: string
  shipping_country: string
  shipping_postcode: string
  shipping_company: string | null
  shipping_phone: string
  shipping_email: string
  shipping_coverage: string
  subscription: number
  billing_cif: string | null
  created_at: string
  updated_at: string
  purpose: string | null
  shipping_service: string
  shipping_office: string | null
  billing_customer_invoice_id: string | null
}
