export const useUnavailableDates = () => {
  const { unavailableDates } = useAvailableDatesState()
  const { getClosedDays, getHolidays } = useAvailableDatesRepository()

  const excludeUnavailableDates = async (productIds: number[], postCode: string, carrier: string) => {
    const [closedDays, holidays] = await Promise.all([
      getClosedDays(),
      getHolidays(productIds, postCode, carrier),
    ])

    unavailableDates.value = [
      ...closedDays.map((date: string) => new Date(date)),
      ...holidays,
    ]
  }

  return {
    unavailableDates,
    excludeUnavailableDates,
  }
}
