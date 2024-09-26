import type {
  CancelSubscriptionPayload,
  updateSubscriptionItemPayload,
  PauseSubscriptionPayload,
  DonationPayload,
  PeriodicityPayload, AddItemPayload,
} from '~/server/contexts/backend/subscriptions/domain/SubscriptionPayload'

export interface SubscriptionRepository {
  getById(id: number): Promise<Subscription | null>

  getByUserId(userId: number): Promise<Subscription[] | null>

  addCoupon(subscriptionId: number, coupon: string): Promise<void>

  addItem(addItemPayload: AddItemPayload): Promise<void>

  cancelDonationOrGift(subscriptionId: string, date: string): Promise<void>

  cancel(subscriptionId: number, cancelSubscriptionPayload: CancelSubscriptionPayload): Promise<void>

  donateToONG(subscriptionId: number, donationData: DonationPayload): Promise<void>

  getSubscriptionTotal()

  giveOrderToFriend(subscriptionId: number, giveOrderToFriendData: DonationPayload): Promise<void>

  pause(subscriptionId: number, pauseSubscriptionData: PauseSubscriptionPayload): Promise<void>

  removeSkip(subscriptionId: number, skip: string[]): Promise<void>

  removeSubscriptionCoupon(subscriptionId: number): Promise<void>

  skipAnOrder(subscriptionId: number, newDatesToSkip: string[]): Promise<void>

  updateShippingMeta(metaId: number, newShippingMeta: any): Promise<void>

  updateBillingMeta(metaId: number, newBillingMeta: any): Promise<void>

  unpause(subscriptionId: number): Promise<void>

  updatePeriodicity(subscriptionId: number, periodicity: PeriodicityPayload): Promise<void>

  updateItem(updateSubscriptionItemData: updateSubscriptionItemPayload)

  updatePayment(subscriptionId: number, paymentId: number): Promise<void>

}
