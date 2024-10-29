import { useGetTimeSlotState } from '~/composables/shared/utils/time-slot/useGetTimeSlotState.ts'

export const useGetTimeSlot = () => {
  const { timeSlot } = useGetTimeSlotState()
  const { getTimeSlot } = useStrapiLocationRepository()

  const executeGetTimeSlot = async (postcode, coverage): Promise<TimeSlot> => {
    timeSlot.value = await getTimeSlot(postcode, coverage)
  }

  return {
    timeSlot,
    executeGetTimeSlot,
  }
}
