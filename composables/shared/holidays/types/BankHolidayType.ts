export type CloseDays = string[]
export type HolidayQuery = {
    isActive: boolean
    minDate: string
    maxDate: string
    products?: Array<number | null>
    postcode?: number
    coverage?: string
}

export type BankHoliday = {
  id?: number
  festivityDate: string
  festivityType: string
  adjustedDeliveryDate: string
  holidayName: string
}
