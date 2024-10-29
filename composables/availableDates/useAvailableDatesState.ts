export const useAvailableDatesState = () => {
  const unavailableDates = useState('unavailableDates', () => [])
  const availableWeekDays = useState('availableWeekDays', () => [])

  return {
    unavailableDates,
    availableWeekDays,
  }
}
