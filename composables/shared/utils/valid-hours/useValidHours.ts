import type { TimeSlot } from '~/composables/shared/utils/types/TimeSlot.ts'

export const useGetValidHours = () => {
  const { validHours } = useValidHoursState()

  const executeGetValidHours = (timeSlot: TimeSlot) => {
    console.info('executeGetValidHours', timeSlot)
    if (timeSlot === '6h') {
      validHours.value = [
        { timeSlot: 'full', from: '10:00', to: '22:00' },
        { timeSlot: 'morning', from: '10:00', to: '16:00' },
        { timeSlot: 'night', from: '16:00', to: '22:00' },
      ]
    }
    else {
      validHours.value = [
        { timeSlot: 'full', from: '10:00', to: '22:00' },
        { timeSlot: 'morning', from: '10:00', to: '14:00' },
        { timeSlot: 'afternoon', from: '14:00', to: '18:00' },
        { timeSlot: 'night', from: '18:00', to: '22:00' },
      ]
    }
  }

  return {
    validHours,
    executeGetValidHours,
  }
}
