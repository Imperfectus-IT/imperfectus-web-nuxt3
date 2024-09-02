import dayjs from 'dayjs'

export const useGetAllHolidays = () => {
  const executeGetAllHolidays = async (query: HolidayQuery): Promise<BankHoliday[]> => {
    const { getAll } = useStrapiHolidayRepository()
    const params: HolidayQuery = {
      isActive: query.isActive ?? true,
      minDate: query.minDate ?? dayjs().format('YYYY-MM-DD'),
      maxDate: query.maxDate ?? dayjs().add(1, 'month').format('YYYY-MM-DD'),
      products: query.products ?? [],
      postcode: query.postcode,
      coverage: query.coverage,
    }
    return await getAll(params)
  }
  return {
    executeGetAllHolidays,
  }
}
