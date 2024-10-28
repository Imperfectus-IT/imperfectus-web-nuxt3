export type BillingAddress = {
  id?: number
  firstname: string
  lastname: string
  email: string
  phone: string
  company: string
  address1: string
  address2: string
  postalCode: string
  city: string
  state: string
  cif: string
  country: string
}

export function createEmpty(): OrderBilling {
  return {
    billingFirstName: '',
    billingLastName: '',
    billingEmail: '',
    billingPhone: '',
    billingAddress: '',
    billingAddress2: '',
    billingPostCode: '',
    billingCity: '',
    billingState: '',
    billingCif: '',
  }
}
