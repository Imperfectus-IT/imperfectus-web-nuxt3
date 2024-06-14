import type {
  Location, LocationAvailability,
  LocationAvailabilityQuery,
  LocationQuery,
} from '~/composables/location/types/LocationType.ts'

export const useLocationRepository = () => {
  const findLocations = async (query: LocationQuery): Promise<Location[]> => {
    const { find } = useStrapi()
    return await find<Location[]>('locations', query)
  }
  const getLocationsAvailability = async (query: LocationAvailabilityQuery): Promise<LocationAvailability[]> => {
    const client = useStrapiClient()
    return await client<LocationAvailability[]>(`/locations/availability`, { method: 'GET', params: query })
  }

  return {
    findLocations,
    getLocationsAvailability,
  }
}
