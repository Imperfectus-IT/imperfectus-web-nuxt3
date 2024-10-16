import type { LocationQuery } from '~/composables/shared/location/types/LocationType.ts'

export const useGetCoverageByPostalCode = () => {
  const { findLocations } = useStrapiLocationRepository()
  const executeFindCoverageByPostalCode = async (query: LocationQuery): Promise<string | null> => {
    const locations = await findLocations(query)
    return locations && locations.length && locations[0]?.coverage ? locations[0].coverage : null
  }

  return {
    executeFindCoverageByPostalCode,
  }
}
