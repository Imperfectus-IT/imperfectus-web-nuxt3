export interface shoppingCartCoverage {
  shippingCoverage: string
  shippingService: string | null
  shippingOffice: string | null
}

export const createEmpty = (): shoppingCartCoverage => {
  return {
    shippingCoverage: '',
    shippingService: null,
    shippingOffice: null,
  }
}
