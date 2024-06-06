export interface Order {
  id: number
  order_id: number
  status: string
  deliveryDate: string
  orderItems: OrderItem[]
  billing: Billing
  deliveryInfo: OrderDelivery
  shippingInfo: OrderShipping
  billingInfo: OrderBilling
}

export interface OrderItem {
  amount: number
  sku: string
  exclusions: string[]
  image: string
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
  billingFullName: string
  billingEmail: string
  billingPhone: string
  billingAddress: string,
  billingAddress2: string,
  billingCP: string
  billingCity: string,
  billingState: string,
  billingNif: string,
  billingCountry: string
}

export interface OrderShipping {
  shippingFullName: string
  shippingEmail: string
  shippingPhone: string
  shippingAddress: string
  shippingCP: string
  shippingCity: string
}
