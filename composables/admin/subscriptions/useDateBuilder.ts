import type { CalendarDate } from '~/components/admin/my-subscriptions/types/CalendarDate'

export const useDateBuilder = () => {
  const dateBuilder = (date: CalendarDate) => {
    const { year, month, day } = date
    if (day < 10 && month < 10) {
      const dayWith0 = `0${day}`
      const monthWith0 = `0${month + 1}`
      return `${year}-${monthWith0}-${dayWith0}`
    }
    if (day < 10) {
      const dayWith0 = `0${day}`
      return `${year}-${month + 1}-${dayWith0}`
    }
    if (month < 10) {
      const monthWith0 = `0${month + 1}`
      return `${year}-${monthWith0}-${day}`
    }
    return `${year}-${month + 1}-${day}`
  }
  return {
    dateBuilder,
  }
}
