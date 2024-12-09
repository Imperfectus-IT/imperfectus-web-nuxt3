import type { BoxProduct, ItemProduct } from '@/composables/shared/products/domain/Product.ts'

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
  shippingCoverage: OrderCoverage
  orderReview: string | null
  subscription: number
}

export interface OrderItem {
  id: number
  amount: number
  finalAmount: number
  sku: string
  exclusions: ItemProduct []
  image: string
  product: BoxProduct
  coupon: Coupon
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
  saved: number
  coupon: Coupon | null
  shippingCosts: string
  total: number
}

export interface OrderDelivery {
  deliveryDate: string
  coverage: string
  deliveryTime: string
  tracking: {
    trackingId: string
    trackingUrl: string
  }
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
  billingCompany?: string
  billingSocialName?: string
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
  shippingCoverage: OrderCoverage
}

export interface OrderCoverage {
  shippingCoverage: string
  shippingService: string | null
  shippingOffice: string | null
}

export type TotalOrderDelivery = {
  deliveryDate: string
  preferredDay: string
}

export type TotalOrderAmountQuery = {
  items: OrderItem[] | ShoppingCartItem[]
  coupon: Partial<Coupon>
  isPlaced?: boolean
  delivery?: TotalOrderDelivery
  orderId?: number
}
