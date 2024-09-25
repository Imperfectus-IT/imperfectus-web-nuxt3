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

export function createEmpty(): BillingAddress {
  return {
    id: null,
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    company: '',
    address1: '',
    address2: '',
    postalCode: '',
    city: '',
    state: '',
    cif: '',
    country: '',
  }
}
