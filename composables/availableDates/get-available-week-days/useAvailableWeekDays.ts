import { useAvailableDatesState } from '../useAvailableDatesState'
import { useAvailableDatesRepository } from '../useAvailableDatesRepository'

export const useAvailableWeekDays = () => {
  const { availableWeekDays } = useAvailableDatesState()
  const { getAvailabilityByPostCode } = useAvailableDatesRepository()

  const excludeAvailableWeekDays = async (postCode: string, coverage: string) => {
    availableWeekDays.value = await getAvailabilityByPostCode(postCode, coverage)
  }

  return {
    availableWeekDays,
    excludeAvailableWeekDays,
  }
}
