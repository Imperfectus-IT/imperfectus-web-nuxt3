import type { DonationPayload } from '../types/DonationPayload'
import type { Periodicity } from '~/components/admin/my-subscriptions/types/Periodicity.ts'
import type {
  Subscription,
  SubscriptionBilling,
  SubscriptionShipping,
} from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'
import type {
  updateSubscriptionItemPayload,
} from '~/components/admin/my-subscriptions/partials/SubscriptionModifyItem.vue'
import type { addItemPayload } from '~/components/admin/my-subscriptions/partials/SubscriptionAddItem.vue'
import type { PauseSubscriptionPayload } from '~/components/admin/my-subscriptions/partials/SubscriptionPauseModal.vue'
import type { CancelSubscriptionPayload } from '~/components/admin/my-subscriptions/partials/SubscriptionCancelModal.vue'

export const useUpdateSubscription = () => {
  const { subscriptions } = useSubscriptionsState()
  const { addSubscriptionCoupon, cancelSubscription, cancelDonation, donateToONG, findSubscriptionsByUser, giveOrderToFriend, skipAnOrder, removeSkip, removeSubscriptionCoupon, unpauseSubscription, updateSubscriptionPeriodicity, updateSubscriptionPayment, updateSubscriptionBillingMeta, updateShippingMeta, updateSubscriptionItem, addSubscriptionItem, pauseSubscription } = useSubscriptionRepository()

  const executeAddSubscriptionCoupon = async (subscriptionId: number, coupon: string) => {
    await addSubscriptionCoupon(subscriptionId, coupon)
    subscriptions.value = await findSubscriptionsByUser()
  }
  const executeRemoveSubscriptionCoupon = async (subscriptionId: number) => {
    await removeSubscriptionCoupon(subscriptionId)
    return subscriptions.value = await findSubscriptionsByUser()
  }
  const executeAddSubscriptionItem = async (newSubscriptionItem: addItemPayload, subscriptionId: number) => {
    await addSubscriptionItem(newSubscriptionItem, subscriptionId)
    return subscriptions.value = await findSubscriptionsByUser()
  }
  const executeDonateToONG = async (body: DonationPayload) => {
    const response = await donateToONG(body)
    return subscriptions.value = await findSubscriptionsByUser()
  }
  const executeGiveOrderToFriend = async (giveOrderToFriendData: DonationPayload) => {
    return giveOrderToFriend(giveOrderToFriendData)
  }
  const executeCancelDonation = async (subscriptionId: number, date: string) => {
    await cancelDonation(subscriptionId, date)
    return subscriptions.value = await findSubscriptionsByUser()
  }
  const executePauseSubscription = async (pauseSubscriptionData: PauseSubscriptionPayload, subscriptionId: number) => {
    const response = await pauseSubscription(pauseSubscriptionData, subscriptionId)
    subscriptions.value = await findSubscriptionsByUser()
    return response
  }
  const executeUnpauseSubscription = async (subscriptionId: number) => {
    const response = await unpauseSubscription(subscriptionId)
    subscriptions.value = await findSubscriptionsByUser()
    return response
  }
  const executeCancelSubscription = async (subscriptionId: number, cancelSubscriptionData: CancelSubscriptionPayload) => {
    const response = await cancelSubscription(subscriptionId, cancelSubscriptionData)
    subscriptions.value = await findSubscriptionsByUser()
    return response
  }
  const executeUpdatePeriodicity = async (subscription: Subscription, periodicity: Periodicity) => {
    await updateSubscriptionPeriodicity(subscription, periodicity)
    subscriptions.value = await findSubscriptionsByUser()
    return
  }
  const executeUpdateShippingMeta = async (metaId: number, newShippingMeta: SubscriptionShipping) => {
    await updateShippingMeta(metaId, newShippingMeta)
    subscriptions.value = await findSubscriptionsByUser()
    return
  }
  const executeSkipAnOrder = async (subscriptionId: number, skip: string[]) => {
    await skipAnOrder(subscriptionId, skip)
    subscriptions.value = await findSubscriptionsByUser()
    return
  }
  const executeRemoveSkip = async (subscriptionId: number, skip: string[]) => {
    await removeSkip(subscriptionId, skip)
    subscriptions.value = await findSubscriptionsByUser()
    return
  }

  const executeUpdatePayment = async (subscription: Subscription, paymentId: number) => {
    await updateSubscriptionPayment(subscription, paymentId)
    subscriptions.value = await findSubscriptionsByUser()
    return
  }

  const executeUpdateBillingMeta = async (metaId: number, newBillingMeta: SubscriptionBilling) => {
    await updateSubscriptionBillingMeta(metaId, newBillingMeta)
    subscriptions.value = await findSubscriptionsByUser()
    return
  }

  const executeUpdateSubscriptionItem = async (updateSubscriptionItemData: updateSubscriptionItemPayload) => {
    await updateSubscriptionItem(updateSubscriptionItemData)
    subscriptions.value = await findSubscriptionsByUser()
    return
  }

  return {
    executeAddSubscriptionCoupon,
    executeCancelDonation,
    executeCancelSubscription,
    executeDonateToONG,
    executeGiveOrderToFriend,
    executeAddSubscriptionItem,
    executePauseSubscription,
    executeSkipAnOrder,
    executeRemoveSkip,
    executeRemoveSubscriptionCoupon,
    executeUpdateShippingMeta,
    executeUnpauseSubscription,
    executeUpdatePeriodicity,
    executeUpdatePayment,
    executeUpdateBillingMeta,
    executeUpdateSubscriptionItem,
    subscriptions,
  }
}
