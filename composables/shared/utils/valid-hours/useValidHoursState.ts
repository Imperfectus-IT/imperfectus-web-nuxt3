export const useValidHoursState = () => {
  const validHours = useState<Array<string>>('validHours', () => [])

  return {
    validHours,
  }
}
