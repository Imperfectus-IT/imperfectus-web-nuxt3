import type { CalendarDate } from '~/components/admin/my-subscriptions/types/CalendarDate.ts'

export const useDateBuilder = () => {
  const dateBuilder = (date: CalendarDate) => {
    const { year, month, day } = date

    // Use String.padStart() to add leading zeros if necessary
    const dayWith0 = String(day).padStart(2, '0')
    const monthWith0 = String(month + 1).padStart(2, '0')

    return `${year}-${monthWith0}-${dayWith0}`
  }

  return {
    dateBuilder,
  }
}
