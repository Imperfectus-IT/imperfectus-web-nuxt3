import type { DayMapping } from '~/components/admin/my-subscriptions/DayMapping.ts'

export type Subscription = {
  id: number
  status: string
  frequency: string
  skip: string[]
  nextPayment: string
  cancelledAt: string
  preferredDay: keyof typeof DayMapping
  subscriptionItems: SubscriptionItem[]
  donations: string[]
  subscriptionMeta: SubscriptionMeta
}

export type SubscriptionItem = {
  amount: number
  sku: string
  exclusions: string[]
  image: string
}

export type SubscriptionMeta = {
  shipping_address1: string
  shipping_address2: string
  shipping_city: string
  shipping_country: string
  shipping_email: string
  shipping_firstname: string
  shipping_lastname: string
  shipping_phone: string
  shipping_postcode: string
  shipping_state: string
}
