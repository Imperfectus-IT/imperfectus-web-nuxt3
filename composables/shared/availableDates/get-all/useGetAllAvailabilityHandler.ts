import { useGetAllAvailability } from '~/composables/shared/availableDates/get-all/useGetAllAvailability.ts'

export const useGetAllAvailabilityHandler = () => {
  const { executeGetAllAvailability } = useGetAllAvailability()
  const handleGetAllAvailability = async (postCode: string, product: string, carrier: string) => {
    return await executeGetAllAvailability(postCode, product, carrier)
  }
  return {
    handleGetAllAvailability,
  }
}
