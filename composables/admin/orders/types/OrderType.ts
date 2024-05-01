export interface Order {
  id: number,
  order_id: number,
  status: string,
  orderItems: OrderItem[],
  billing: Billing,
  deliveryInfo: OrderDelivery,
  shippingInfo: OrderShipping,
  billingInfo: OrderBilling
}

export interface OrderItem {
  amount: number,
  sku: string,
  exclusions: string[],
}

export interface Billing {
  state: string,
  amount: number,
  shippingCosts: string
}

export interface OrderDelivery {
  deliveryDate: string,
  coverage: string,
  deliveryTime: string,
  trackingID: string,
  trackingLink: string
}

export interface OrderBilling {
  billingFullName: string,
  billingEmail: string,
  billingPhone: string,
  billingAddress: string,
  billingCP: string,
  billingCity: string,
}

export interface OrderShipping {
  shippingFullName: string,
  shippingEmail: string,
  shippingPhone: string,
  shippingAddress: string,
  shippingCP: string,
  shippingCity: string
}