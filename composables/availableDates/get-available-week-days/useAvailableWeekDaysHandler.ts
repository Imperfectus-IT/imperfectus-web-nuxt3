export const availableWeekDaysHandler = () => {
  const { availableWeekDays } = useAvailableDatesState()
  const { excludeAvailableWeekDays } = useAvailableWeekDays()

  const getAvailableWeekDaysHandler = async (postCode: string, coverage: string) => {
    await excludeAvailableWeekDays(postCode, coverage)
  }

  return {
    availableWeekDays,
    getAvailableWeekDaysHandler,
  }
}
