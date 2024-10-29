export const useValidHoursHandler = () => {
  const { validHours } = useValidHoursState()
  const { executeGetValidHours } = useGetValidHours()

  const getValidHoursHandler = (timeSlot: TimeSlot) => {
    executeGetValidHours(timeSlot)
  }

  return {
    validHours,
    getValidHoursHandler,
  }
}
