import dayjs from 'dayjs'

export const useGetNextDatesFromFrequency = () => {
  const getNextDatesFromFrequency = (frequency: string, nextPayment: string): string[] => {
    const upperLimit = dayjs(nextPayment).add(6, 'months')
    let lowerLimit = dayjs(nextPayment)
    const dates = []
    if (frequency === 'weekly') {
      dates.push(lowerLimit.format('YYYY-MM-DD'))
      while (lowerLimit.isBefore(upperLimit)) {
        lowerLimit = lowerLimit.add(1, 'week')
        dates.push(lowerLimit.format('YYYY-MM-DD'))
      }
      dates.push(upperLimit.format('YYYY-MM-DD'))
    }
    else if (frequency === 'biweekly') {
      dates.push(lowerLimit.format('YYYY-MM-DD'))
      while (lowerLimit.isBefore(upperLimit)) {
        lowerLimit = lowerLimit.add(2, 'week')
        dates.push(lowerLimit.format('YYYY-MM-DD'))
      }
      dates.push(upperLimit.format('YYYY-MM-DD'))
    }
    return dates
  }
  return {
    getNextDatesFromFrequency,
  }
}
