import dayjs from 'dayjs'
import { DayMapping } from '~/components/admin/my-subscriptions/DayMapping.ts'

export const useGetDeliveryDateFromNextPayment = () => {
  const getDeliveryDateFromNextPayment = (nextPayment: string, preferredDay: string) => {
    if (!nextPayment) return null
    const daysToAdd: number = DayMapping[preferredDay as keyof typeof DayMapping]
    return dayjs(nextPayment).add(daysToAdd, 'd').format('YYYY-MM-DD')
  }
  return { getDeliveryDateFromNextPayment }
}
