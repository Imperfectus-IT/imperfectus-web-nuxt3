import type { BoxProduct, ItemProduct } from '~/composables/admin/products/types/Product.ts'
import type { Coupon } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

export interface Order {
  id: number
  isValidForReview: boolean
  order_id: number
  status: string
  discarded: boolean
  deliveryDate: string
  orderMeta: number
  orderItems: OrderItem[]
  billing: Billing
  deliveryInfo: OrderDelivery
  shippingInfo: OrderShipping
  billingInfo: OrderBilling
  orderReview: string
  coupon: Coupon
  subscription: number
}

export interface OrderItem {
  id: number
  amount: number
  sku: string
  exclusions: ItemProduct []
  image: string
  product: BoxProduct
  review: {
    id: number
    ratings: {
      productQuality: number
      deliveryService: number
      overallExperience: number
    }
  }
}

export interface Billing {
  state: string
  amount: number
  shippingCosts: string
  total: number
}

export interface OrderDelivery {
  deliveryDate: string
  coverage: string
  deliveryTime: string
  tracking: {
    trackingID: string
    trackingLink: string
    boxType: string
  }[]
}

export interface OrderBilling {
  billingFirstName: string
  billingLastName: string
  billingEmail: string
  billingPhone: string
  billingAddress: string
  billingAddress2: string
  billingPostCode: string
  billingCity: string
  billingState: string
  billingCif: string
  billingCountry: string
}

export interface OrderShipping {
  shippingFirstName: string
  shippingLastName: string
  shippingEmail: string
  shippingPhone: string
  shippingAddress: string
  shippingAddress2: string
  shippingPostCode: string
  shippingCity: string
  shippingNotes: string
  shippingCountry: string
  shippingState: string
  shippingCoverage: string
}
