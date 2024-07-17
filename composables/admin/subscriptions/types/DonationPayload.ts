import type { SubscriptionShipping } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

export type DonationPayload = {
  subscriptionId: number
  deliveryDate: string
  givenTo: string
  newSubscriptionMeta: SubscriptionShipping
  purpose: string
  date: string
}
