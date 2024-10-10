export const useStrapiHolidayRepository = () => {
  const getAll = async (query: HolidayQuery): Promise<BankHoliday[]> => {
    const client = useStrapiClient()
    return await client<BankHoliday[]>(`/holidays`, { method: 'GET', params: query })
  }
  return {
    getAll,
  }
}
