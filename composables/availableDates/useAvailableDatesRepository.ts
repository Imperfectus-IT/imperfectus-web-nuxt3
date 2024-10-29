import dayjs from 'dayjs'

export const useAvailableDatesRepository = () => {
  const env = useRuntimeConfig()
  const client = useStrapiClient()
  const getAvailabilityByPostCode = async (postCode: string, coverage: string) => {
    return await client(`/locations/availability/${postCode}?coverage=${coverage}`)
  }
  const getClosedDays = async () => {
    return await client(`/options/closed-days`)
  }
  const getHolidays = async (productIds: number[], postCode: string, carrier: string) => {
    const minDate = dayjs().add(2, 'day').format('YYYY-MM-DD')
    const maxDate = dayjs().add(1, 'month').format('YYYY-MM-DD')

    let queryParams = 'isActive=true'
    queryParams += `&minDate=${minDate}`
    queryParams += `&maxDate=${maxDate}`
    queryParams += `&products=${productIds.join(',')}`
    queryParams += `&postcode=${postCode}`
    queryParams += `&coverage=${carrier}`

    return await client(`/holidays?${queryParams}`).then((holidays) => {
      return holidays.map(holiday => new Date(holiday.date))
    })
  }
  return {
    getAvailabilityByPostCode,
    getClosedDays,
    getHolidays,
  }
}
