export type Subscription = {
  id: number
  subscriptionId: string
  status: string
  frequency: string
  skip: string[]
  nextPayment: string
  nextDeliveryDateFromPaused: string
  cancelledAt: string
  preferredDay: keyof typeof DayMapping
  subscriptionItems: SubscriptionItem[]
  donations: string[]
  shippingInfo: SubscriptionShipping
  billingInfo: SubscriptionBilling
  shippingCoverage: SubscriptionCoverage
  subscriptionMeta: number
  preferredHour: string
  // coupon: Coupon | null
  payment: Payment | number
}

export type SubscriptionItem = {
  id: number
  quantity: number
  amount: number
  sku: string
  exclusions: ItemProduct[]
  image: string
  product: BoxProduct
  coupon: Coupon
}

export interface SubscriptionBilling {
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

export interface SubscriptionShipping {
  shippingFirstName: string
  shippingLastName: string
  shippingEmail: string
  shippingPhone: string
  shippingAddress: string
  shippingAddress2: string
  shippingPostCode: string
  shippingCity: string
  shippingState: string
  shippingCountry: string
  shippingNotes: string
}

export interface SubscriptionCoverage {
  shippingCoverage: string
  shippingService: string | null
  shippingOffice: string | null
}
