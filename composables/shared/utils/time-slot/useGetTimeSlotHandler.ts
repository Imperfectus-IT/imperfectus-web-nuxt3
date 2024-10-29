import { useGetTimeSlotState } from '~/composables/shared/utils/time-slot/useGetTimeSlotState.ts'

export const useGetTimeSlotHandler = () => {
  const { timeSlot } = useGetTimeSlotState()
  const { executeGetTimeSlot } = useGetTimeSlot()

  const getTimeSlotHandler = async (postcode, coverage) => {
    await executeGetTimeSlot(postcode, coverage)
  }

  return {
    timeSlot,
    getTimeSlotHandler,
  }
}
