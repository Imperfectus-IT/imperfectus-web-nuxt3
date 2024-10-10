export const useGetAllAvailability = () => {
  const { getAvailabilityByPostCode, getClosedDays, getHolidays } = useAvailableDatesRepository()
  const executeGetAllAvailability = async (postCode: string, product: string, carrier: string) => {
    const availability = await getAvailabilityByPostCode(postCode)
    const closedDays = await getClosedDays()
    const holidays = await getHolidays(product, postCode, carrier)
    return {
      availability,
      closedDays,
      holidays,
    }
  }
  return {
    executeGetAllAvailability,
  }
}
