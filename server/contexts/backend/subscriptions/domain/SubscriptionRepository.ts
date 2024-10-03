import type {
  CancelSubscriptionPayload,
  updateSubscriptionItemPayload,
  PauseSubscriptionPayload,
  DonationPayload,
  PeriodicityPayload, AddItemPayload, updateItemPayload,
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

  updateShipping(metaId: number, newShippingMeta: SubscriptionShipping): Promise<void>

  updateBilling(metaId: number, newBillingMeta: SubscriptionBilling): Promise<void>

  unpause(subscriptionId: number): Promise<void>

  updatePeriodicity(subscriptionId: number, periodicity: PeriodicityPayload): Promise<void>

  updateItem(updateSubscriptionItemData: updateItemPayload): Promise<void>

  updatePayment(subscriptionId: number, paymentId: number): Promise<void>

}
