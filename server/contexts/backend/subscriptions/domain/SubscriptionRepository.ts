import type {
  CancelSubscriptionPayload,
  updateSubscriptionItemPayload,
  PauseSubscriptionPayload,
  DonationPayload,
  PeriodicityPayload,
} from '~/server/contexts/backend/subscriptions/domain/SubscriptionPayload'

export interface SubscriptionRepository {
  getById(id: number): Promise<Subscription | null>

  getByUserId(userId: number): Promise<Subscription[] | null>

  addSubscriptionCoupon(subscriptionId: number, coupon: string): Promise<void>

  addSubscriptionItem(subscriptionId: number, subscriptionItem: any): Promise<void>

  cancelDonation(subscriptionId: number, date: string): Promise<void>

  cancelSubscription(subscriptionId: number, cancelSubscriptionPayload: CancelSubscriptionPayload): Promise<void>

  donateToONG(donationPayload: DonationPayload): Promise<void>

  getSubscriptionTotal()

  giveOrderToFriend(giveOrderToFriendData: DonationPayload): Promise<void>

  pauseSubscription(subscriptionId: number, pauseSubscriptionData: PauseSubscriptionPayload): Promise<void>

  removeSkip(subscriptionId: number, skip: string[]): Promise<void>

  removeSubscriptionCoupon(subscriptionId: number): Promise<void>

  skipAnOrder(subscriptionId: number, skip: string[]): Promise<void>

  updateShippingMeta(metaId: number, newShippingMeta: any): Promise<void>

  updateBillingMeta(metaId: number, newBillingMeta: any): Promise<void>

  unpauseSubscription(subscriptionId: number): Promise<void>

  updateSubscriptionPeriodicity(subscriptionId: number, periodicity: PeriodicityPayload): Promise<void>

  updateSubscriptionItem(updateSubscriptionItemData: updateSubscriptionItemPayload)

  updateSubscriptionPayment(subscriptionId: number, paymentId: number): Promise<void>

}
