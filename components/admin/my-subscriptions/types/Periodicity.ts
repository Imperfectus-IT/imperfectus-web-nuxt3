import type { DayMapping } from '~/components/admin/my-subscriptions/DayMapping.ts'

export type Periodicity = {
  frequency: string
  preferredDay: keyof typeof DayMapping
  preferredHour: string
}
