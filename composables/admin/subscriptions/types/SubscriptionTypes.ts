import type { DayMapping } from "~/components/admin/my-subscriptions/types/DayMapping"

export type Subscription = {
  id: number,
  status: string,
  frequency: string,
  skip: string[],
  nextPayment: string,
  cancelledAt: string,
  preferredDay: keyof DayMapping,
  subscriptionItems: SubscriptionItem[],
}

export type SubscriptionItem = {
  amount: number
  sku: string
  exclusions: string[]
  image: string
}
