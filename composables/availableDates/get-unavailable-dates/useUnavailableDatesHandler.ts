export const useUnavailableDatesHandler = () => {
  const { unavailableDates } = useAvailableDatesState()
  const { excludeUnavailableDates } = useUnavailableDates()

  const getUnavailableDates = async (productIds: number[], postCode: string, carrier: string) => {
    await excludeUnavailableDates(productIds, postCode, carrier)
  }

  return {
    unavailableDates,
    getUnavailableDates,
  }
}
