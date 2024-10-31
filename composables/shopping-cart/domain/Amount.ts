export type ShoppingCartAmount = {
  subtotal: number
  shippingCost: number
  saved: number
  total: number
}

export const createEmpty = (): ShoppingCartAmount => {
  return {
    subtotal: 0,
    shippingCost: 0,
    saved: 0,
    total: 0,
  }
}
