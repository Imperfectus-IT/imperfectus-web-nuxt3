import type { DayMapping } from '~/components/admin/my-subscriptions/DayMapping.ts'
import type { BoxProduct } from '~/composables/admin/products/types/Product.ts'
import type { Payment } from '~/composables/payment/types/Payment.ts'

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
  preferredHour: string
  coupon: Coupon | null
  payment: Payment
}

export type Coupon = {
  id: string
  coupon: string
  isActive: boolean
  discountValue: number
  discountType: string
  type: string
}

export type SubscriptionItem = {
  id: number
  quantity: number
  amount: number
  sku: string
  exclusions: string[]
  image: string
  product: BoxProduct
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
