export const useGetLocationsAvailability = () => {
  const { getLocationsAvailability } = useStrapiLocationRepository()
  const executeGetLocationsAvailability = async (query: LocationAvailabilityQuery): Promise<LocationAvailability[]> => {
    return await getLocationsAvailability(query)
  }

  return {
    executeGetLocationsAvailability,
  }
}
