import { useStrapiLocationRepository } from '~/composables/locations/infrastructure/useStrapiLocationRepository.ts'

export const useGetSeurPickUpPoints = () => {
  const { getSeurPickUpPoints } = useStrapiLocationRepository()
  const executeGetSeurPickUpPoints = async (postcode: string) => {
    return await getSeurPickUpPoints(postcode)
  }
  return {
    executeGetSeurPickUpPoints,
  }
}
