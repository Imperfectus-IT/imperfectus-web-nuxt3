export const useValidHoursState = () => {
  const validHours = useState<Array<string>>('validHours', () => [{ timeSlot: 'full', from: '10:00', to: '22:00' }])

  return {
    validHours,
  }
}
