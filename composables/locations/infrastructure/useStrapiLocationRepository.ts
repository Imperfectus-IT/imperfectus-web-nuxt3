import { usePickUpPointFactory } from '~/composables/locations/infrastructure/usePickUpPointFactory.ts'

export const useStrapiLocationRepository = () => {
  const client = useStrapiClient()
  const findLocations = async (query: LocationQuery): Promise<Location[]> => {
    const { find } = useStrapi()
    return await find<Location[]>('locations', query)
  }
  const getLocationsAvailability = async (query: LocationAvailabilityQuery): Promise<LocationAvailability[]> => {
    return await client<LocationAvailability[]>('/locations/availability', { method: 'GET', params: query })
  }

  const getCorreosPickUpPoints = async (postcode: string) => {
    const strapiPickUpPoints = await client(`/pick-up-points?postcode=${postcode}&coverage=correosexp`, { method: 'GET' })
    return Promise.all(strapiPickUpPoints.map(pickUpPoint => usePickUpPointFactory().correosPickUpPoint(pickUpPoint)))
  }

  const getPickUpPointById = async (id: string, postcode: string, coverage: string) => {
    const strapiPickUpPoint = await client(`http://localhost:3000/pick-up-points/${id}?postcode=${postcode}&coverage=${coverage}`)
    return coverage === ALL_COVERAGES.CORREOSEXPRESS.value ? usePickUpPointFactory().correosPickUpPoint(strapiPickUpPoint) : usePickUpPointFactory().seurPickUpPoint(strapiPickUpPoint)
  }

  const getSeurPickUpPoints = async (postcode: string) => {
    const strapiPickUpPoints = await client(`/pick-up-points?postcode=${postcode}&coverage=seur`, { method: 'GET' })
    return Promise.all(strapiPickUpPoints.map(pickUpPoint => usePickUpPointFactory().seurPickUpPoint(pickUpPoint)))
  }

  const getShippingCompaniesByPostcodeAndDate = async (postcode: string, deliveryDate: string) => {
    return await client(`/locations/shippingCompanies?postcode=${postcode}&deliveryDate=${deliveryDate}`, { method: 'GET' })
  }

  const getTimeSlot = async (postcode: string, coverage: string): Promise<string> => {
    try {
      return await client(`/locations/timeSlot?coverage=${coverage}&postcode=${postcode}`, { method: 'GET' })
    }
    catch (error) {
      console.info(`Error getting time slot for postcode ${postcode} and coverage ${coverage}`, error)
      if (error === 'Not Found') {
        return ''
      }
      throw error
    }
  }

  return {
    findLocations,
    getLocationsAvailability,
    getSeurPickUpPoints,
    getCorreosPickUpPoints,
    getPickUpPointById,
    getShippingCompaniesByPostcodeAndDate,
    getTimeSlot,
  }
}
