export const useGetAllHolidaysState = () => {
  const holidays = ref<BankHoliday[]>([])

  return {
    holidays,
  }
}
