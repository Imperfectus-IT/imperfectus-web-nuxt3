export type Location = {
  id: number
  postcode: string
  city: string
  state: string
  country: string
  coverage: string
  created_by: number
  updated_by: number
  timeSlot: null | string
}

export type Weekdays = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'

export type LocationAvailability = Weekdays[]

export type LocationQuery = {
  postcode: string
  deliveryDate?: string | undefined
}

export type LocationAvailabilityQuery = {
  postcode: number
}
