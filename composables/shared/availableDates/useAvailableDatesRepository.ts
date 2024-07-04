import dayjs from 'dayjs'

export const useAvailableDatesRepository = () => {
  const env = useRuntimeConfig()
  const getAvailabilityByPostCode = async (postCode: string) => {
    return await $fetch(`${env.public.STRAPI_URL}/locations/availability/${postCode}`)
  }
  const getClosedDays = async () => {
    return await $fetch(`${env.public.STRAPI_URL}/options/closed-days`)
  }
  const getHolidays = async (product: string, postCode: string, carrier: string) => {
    const minDate = dayjs().format('YYYY-MM-DD')
    const maxDate = dayjs().add(1, 'month').format('YYYY-MM-DD')
    return await $fetch(`${env.public.STRAPI_URL}/holidays?isActive=true&minDate=${minDate}&maxDate=${maxDate}&products=${product}&postcode=${postCode}&coverage=${carrier}`)
  }
  return {
    getAvailabilityByPostCode,
    getClosedDays,
    getHolidays,
  }
}
