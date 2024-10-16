import { useStrapiLocationRepository } from '~/composables/locations/infrastructure/useStrapiLocationRepository.ts'

export const useGetCorreosPickUpPoints = () => {
  const { getCorreosPickUpPoints } = useStrapiLocationRepository()
  const executeGetCorreosPickUpPoints = async (postcode: string) => {
    return await getCorreosPickUpPoints(postcode)
  }
  return {
    executeGetCorreosPickUpPoints,
  }
}
