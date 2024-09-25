export type ShippingAddress = {
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
  country: string
  notes: string
}

export const MAX_POSTAL_CODE_LENGTH = 5

export function createEmpty(): ShippingAddress {
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
    country: '',
    notes: '',
  }
}

export function isPostalCodeLengthValid(postalCode: string | null): boolean {
  return postalCode !== null && postalCode.length === MAX_POSTAL_CODE_LENGTH
}
