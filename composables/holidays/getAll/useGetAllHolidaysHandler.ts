import { useGetAllHolidays } from '~/composables/holidays/getAll/useGetAllHolidays.ts'

export const useGetAllHolidaysHandler = () => {
  const { holidays } = useGetAllHolidaysState()
  const { executeGetAllHolidays } = useGetAllHolidays

  const getAllHolidays = async (query: HolidayQuery): Promise<BankHoliday[]> => {
    holidays.value = await executeGetAllHolidays(query)
  }

  return {
    holidays,
    getAllHolidays,
  }
}
