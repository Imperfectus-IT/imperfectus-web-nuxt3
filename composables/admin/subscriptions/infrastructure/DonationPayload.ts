import type { SubscriptionShipping } from '~/composables/admin/subscriptions/domain/SubscriptionTypes.ts'

export type DonationPayload = {
  subscriptionId: number
  deliveryDate: string
  givenTo: string
  newSubscriptionMeta: SubscriptionShipping
  purpose: string
  date: string
}
