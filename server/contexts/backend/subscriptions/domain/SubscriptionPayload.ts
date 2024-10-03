import type { DayMapping } from '~/components/admin/my-subscriptions/DayMapping'

export type AddItemPayload = {
  amount: string
  product: number
  quantity: number
  subscription: number
  exclusions: number[]
}

export type CancelSubscriptionPayload = {
  reason: string
  text: string
}

export type DonationPayload = {
  subscriptionId: number
  deliveryDate: string
  givenTo: string
  newSubscriptionMeta: any
  purpose: string
  date: string
}

export type PauseSubscriptionPayload = {
  reasonPaused: ('notEatingAsMuch' | 'awayFromHome' | 'dislikedVariety' | 'dislikedTransport' | 'other')
  reasonPausedText: string
  nextDeliveryDate: string
}

export type PeriodicityPayload = {
  frequency: string
  preferredDay: keyof typeof DayMapping
  preferredHour: string
}

export type updateItemPayload = {
  newBoxProduct: BoxProduct
  subscriptionItemId: number
  exclusions: number[]
}
