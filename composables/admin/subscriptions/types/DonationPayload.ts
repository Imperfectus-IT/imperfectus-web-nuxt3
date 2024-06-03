import type { SubscriptionMeta } from "./SubscriptionTypes"

export type DonationPayload = {
  subscriptionId: number
  paymentDate: string
  deliveryDate: string
  givenTo: string
  newSubscriptionMeta: SubscriptionMeta
  purpose: string
}