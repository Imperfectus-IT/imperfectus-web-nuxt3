export const useGetTimeSlotState = () => {
  const timeSlot = useState<TimeSlot>('timeSlot', () => null)

  return {
    timeSlot,
  }
}
