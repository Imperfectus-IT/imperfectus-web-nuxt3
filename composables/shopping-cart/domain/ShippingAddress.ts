import { createEmpty as createEmptyCoverage } from './Coverage.ts'

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

export function createEmpty(): OrderShipping {
  return {
    shippingFirstName: '',
    shippingLastName: '',
    shippingEmail: '',
    shippingPhone: '',
    shippingAddress: '',
    shippingAddress2: '',
    shippingPostCode: '',
    shippingCity: '',
    shippingNotes: '',
    shippingCountry: 'ES',
    shippingState: '',
    shippingCoverage: createEmptyCoverage(),
  }
}

export function isPostalCodeLengthValid(postalCode: string | null): boolean {
  return postalCode !== null && postalCode.length === MAX_POSTAL_CODE_LENGTH
}
