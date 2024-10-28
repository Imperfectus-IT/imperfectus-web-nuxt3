import dayjs from 'dayjs'

export const useAvailableDatesRepository = () => {
  const env = useRuntimeConfig()
  const getAvailabilityByPostCode = async (postCode: string, coverage: string) => {
    return await $fetch(`${env.public.STRAPI_URL}/locations/availability/${postCode}?coverage=${coverage}`)
  }
  const getClosedDays = async () => {
    return await $fetch(`${env.public.STRAPI_URL}/options/closed-days`)
  }
  const getHolidays = async (productIds: number[], postCode: string, carrier: string) => {
    const minDate = dayjs().format('YYYY-MM-DD')
    const maxDate = dayjs().add(1, 'month').format('YYYY-MM-DD')

    let queryParams = '?isActive=true'
    queryParams += `&minDate=${minDate}`
    queryParams += `&maxDate=${maxDate}`
    queryParams += `&products=${productIds.join(',')}`
    queryParams += `&postcode=${postCode}`
    queryParams += `&coverage=${carrier}`

    return await $fetch(`${env.public.STRAPI_URL}/holidays?${queryParams}`)
  }
  return {
    getAvailabilityByPostCode,
    getClosedDays,
    getHolidays,
  }
}
