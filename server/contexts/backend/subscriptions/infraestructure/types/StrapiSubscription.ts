export type StrapiSubscription = {
  id: number
  status: string
  frequency: string
  skip: string[]
  nextPayment: string
  nextDeliveryDateFromPaused: string
  cancelledAt: string
  preferredDay: string
  subscription_items: never[]
  given: object[]
  subscription_meta: StrapiSubscriptionMeta
  preferredHour: string
  coupon: object | null
  payment: object | number
}

export type StrapiSubscriptionMeta = {
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
