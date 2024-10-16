import { useToast } from 'primevue/usetoast'
import type { ComposerTranslation } from 'vue-i18n'
import dayjs from 'dayjs'
import type { Periodicity } from '~/components/admin/my-subscriptions/types/Periodicity.ts'
import type {
  Subscription,
  SubscriptionBilling,
  SubscriptionShipping,
} from '~/composables/admin/subscriptions/domain/SubscriptionTypes.ts'
import type { DonationPayload } from '~/composables/admin/subscriptions/infrastructure/DonationPayload.ts'
import type { updateSubscriptionItemPayload } from '~/components/admin/my-subscriptions/partials/SubscriptionModifyItem.vue'
import type { addItemPayload } from '~/components/admin/my-subscriptions/partials/SubscriptionAddItem.vue'
import type { PauseSubscriptionPayload } from '~/components/admin/my-subscriptions/partials/SubscriptionPauseModal.vue'
import type { CancelSubscriptionPayload } from '~/components/admin/my-subscriptions/partials/SubscriptionCancelModal.vue'
import { DayMapping } from '~/components/admin/my-subscriptions/DayMapping.ts'

export const useUpdateSubscriptionHandler = () => {
  const toast = useToast()
  const { successToast, errorToast } = useToastService()
  const { executeAddSubscriptionCoupon, executeCancelSubscription, executeGiveOrderToFriend, executeCancelDonation, executeDonateToONG, executeSkipAnOrder, executeRemoveSkip, executeRemoveSubscriptionCoupon, executeUpdatePeriodicity, executeUpdatePayment, executeUpdateBillingMeta, executeUpdateShippingMeta, executeUpdateSubscriptionItem, executeAddSubscriptionItem, executePauseSubscription, executeUpdateSubscriptionCoverage, executeUnpauseSubscription } = useUpdateSubscription()

  const addSubscriptionCoupon = async (subscriptionId: number, coupon: string, textData: string, t: ComposerTranslation) => {
    try {
      await executeAddSubscriptionCoupon(subscriptionId, coupon)
      successToast(toast, t(`${textData}addCoupon.successToast.add.title`), t(`${textData}addCoupon.successToast.add.description`))
    }
    catch (error) {
      console.log('Error on adding subscription coupon', error)
      if (error && typeof error === 'object' && 'key' in error) {
        const typedError = error as { key: string, message: string }
        errorToast(toast, t(`${textData}addCoupon.errorToast.title`), t(`${textData}addCoupon.errorToast.${typedError.key}`))
      }
      else {
        errorToast(toast, t(`${textData}addCoupon.errorToast.title`), t(`${textData}addCoupon.errorToast.description`))
      }
    }
  }
  const addSubscriptionItem = async (newSubscriptionItem: addItemPayload, subscriptionId: number, textData: string, t: ComposerTranslation) => {
    try {
      await executeAddSubscriptionItem(newSubscriptionItem, subscriptionId)
      successToast(toast, t(`${textData}addItem.successToast.title`), t(`${textData}addItem.successToast.description`))
    }
    catch (error) {
      console.log('Error on adding subscription item', error)
      errorToast(toast, t(`${textData}addItem.errorToast.title`), t(`${textData}addItem.errorToast.description`))
    }
  }
  const cancelSubscription = async (subscriptionId: number, cancelSubscriptionData: CancelSubscriptionPayload, section: string, t: ComposerTranslation) => {
    try {
      await executeCancelSubscription(subscriptionId, cancelSubscriptionData)
      successToast(toast, t(`${section}cancel.toasts.successToast.title`), t(`${section}cancel.toasts.successToast.description`))
    }
    catch (error) {
      console.log('Error on handling cancel subscription', error)
      errorToast(toast, t(`${section}cancel.toasts.errorToast.title`), t(`${section}cancel.toasts.errorToast.description`))
    }
  }
  const pauseSubscription = async (pauseSubscriptionData: PauseSubscriptionPayload, subscriptionId: number, textData: string, t: ComposerTranslation) => {
    try {
      await executePauseSubscription(pauseSubscriptionData, subscriptionId)
      successToast(toast, t(`${textData}pause.pauseToasts.successToast.title`), t(`${textData}pause.pauseToasts.successToast.description`))
    }
    catch (error) {
      console.log('Error on handling pause subscription', error)
      errorToast(toast, t(`${textData}pause.pauseToasts.errorToast.title`), t(`${textData}pause.pauseToasts.errorToast.description`))
    }
  }
  const updatePeriodicity = async (subscription: Subscription, periodicity: Periodicity, textData: string, t: ComposerTranslation): Promise<void> => {
    try {
      await executeUpdatePeriodicity(subscription, periodicity)
      successToast(toast, t(`${textData}modifyPeriodicity.successToast.title`), t(`${textData}modifyPeriodicity.successToast.description`))
    }
    catch (error) {
      errorToast(toast, t(`${textData}modifyPeriodicity.errorToast.title`), t(`${textData}modifyPeriodicity.errorToast.description`))
    }
  }
  const unpauseSubscription = async (subscriptionId: number, textData: string, t: ComposerTranslation, preferredDay: keyof typeof DayMapping, nextPayment: string) => {
    try {
      await executeUnpauseSubscription(subscriptionId)
      const days = DayMapping[preferredDay as keyof typeof DayMapping]
      const date = dayjs(nextPayment).add(days, 'day').format('DD-MM-YYYY')
      successToast(toast, t(`${textData}pause.unpauseToasts.successToast.title`), t(`${textData}pause.unpauseToasts.successToast.description`, { date }))
    }
    catch (error) {
      console.log('Error', error)
      errorToast(toast, t(`${textData}pause.unpauseToasts.errorToast.title`), t(`${textData}pause.unpauseToasts.errorToast.description`))
    }
  }
  const updateSubscriptionCoverage = async (metaId: number, newCoverage: SubscriptionCoverage) => {
    try {
      await executeUpdateSubscriptionCoverage(metaId, newCoverage)
    }
    catch (error) {
      console.log('Error on updating subscription coverage')
    }
  }
  const updateSubscriptionItem = async (updateSubscriptionItemData: updateSubscriptionItemPayload, textData: string, t: ComposerTranslation): Promise<any> => {
    try {
      await executeUpdateSubscriptionItem(updateSubscriptionItemData)
      successToast(toast, t(`${textData}modifyItem.successToast.title`), t(`${textData}modifyItem.successToast.description`))
    }
    catch (error) {
      console.log('Error on updating subscription item', error)
      errorToast(toast, t(`${textData}modifyItem.errorToast.title`), t(`${textData}modifyItem.successToast.description`))
    }
  }
  const updatePayment = async (subscription: Subscription, paymentId: number, textData: string, t: ComposerTranslation): Promise<void> => {
    try {
      await executeUpdatePayment(subscription, paymentId)
      successToast(toast, t(`${textData}payment.successToast.title`), t(`${textData}payment.successToast.description`))
    }
    catch (error) {
      console.log('Error on updating payment', error)
      errorToast(toast, t(`${textData}payment.errorToast.title`), t(`${textData}payment.errorToast.description`))
    }
  }
  const updateBillingMeta = async (metaId: number, newBillingMeta: SubscriptionBilling, textData: string, t: ComposerTranslation) => {
    try {
      await executeUpdateBillingMeta(metaId, newBillingMeta)
      successToast(toast, t(`${textData}billing.successToast.title`), t(`${textData}billing.successToast.description`))
    }
    catch (error) {
      console.log('Error on updating billing meta', error)
      errorToast(toast, t(`${textData}billing.errorToast.title`), t(`${textData}billing.errorToast.description`))
    }
  }
  const updateShippingMeta = async (metaId: number, newShippingMeta: SubscriptionShipping, textData: string, t: ComposerTranslation) => {
    try {
      await executeUpdateShippingMeta(metaId, newShippingMeta)
      successToast(toast, t(`${textData}shipping.successToast.title`), t(`${textData}shipping.successToast.description`))
    }
    catch (error) {
      console.log('Error on updating shipping meta', error)
      errorToast(toast, t(`${textData}shipping.errorToast.title`), t(`${textData}shipping.errorToast.description`))
    }
  }
  const donateToONG = async (body: DonationPayload, textData: string, t: ComposerTranslation) => {
    try {
      await executeDonateToONG(body)
      successToast(toast, t(`${textData}toasts.donateToasts.successToast.title`), t(`${textData}toasts.donateToasts.successToast.description`))
    }
    catch (error) {
      console.log('Error on handling donation', error)
      errorToast(toast, t(`${textData}toasts.donateToasts.errorToast.title`), t(`${textData}toasts.donateToasts.errorToast.description`))
    }
  }
  const cancelDonation = async (subscriptionId: number, date: string, textData: string, t: ComposerTranslation) => {
    try {
      await executeCancelDonation(subscriptionId, date)
      successToast(toast, t(`${textData}toasts.cancelDonateToasts.successToast.title`), t(`${textData}toasts.cancelDonateToasts.successToast.description`))
    }
    catch (error) {
      console.log('Error on cancelling donations', error)
      errorToast(toast, t(`${textData}toasts.cancelDonateToasts.errorToast.title`), t(`${textData}toasts.cancelDonateToasts.errorToast.description`))
    }
  }
  const giveOrderToFriend = async (giveOrderToFriendData: DonationPayload, textData: string, t: ComposerTranslation) => {
    try {
      await executeGiveOrderToFriend(giveOrderToFriendData)
      successToast(toast, t(`${textData}toasts.giveToasts.successToast.title`), t(`${textData}toasts.giveToasts.successToast.description`))
    }
    catch (error) {
      console.log('Error on giving orders to friends', error)
      errorToast(toast, t(`${textData}toasts.giveToasts.errorToast.title`), t(`${textData}toasts.giveToasts.errorToast.description`))
    }
  }
  const skipAnOrder = async (subscriptionId: number, skip: string[], textData: string, t: ComposerTranslation) => {
    try {
      await executeSkipAnOrder(subscriptionId, skip)
      successToast(toast, t(`${textData}toasts.skipToasts.successToast.title`), t(`${textData}toasts.skipToasts.successToast.description`))
    }
    catch (error) {
      console.log('Error on skipping orders', error)
      errorToast(toast, t(`${textData}toasts.skipToasts.errorToast.title`), t(`${textData}toasts.skipToasts.errorToast.description`))
    }
  }
  const removeSkip = async (subscriptionId: number, skip: string[], textData: string, t: ComposerTranslation) => {
    try {
      await executeRemoveSkip(subscriptionId, skip)
      successToast(toast, t(`${textData}toasts.removeSkipToasts.successToast.title`), t(`${textData}toasts.removeSkipToasts.successToast.description`))
    }
    catch (error) {
      console.log('Error on removing skips', error)
      errorToast(toast, t(`${textData}toasts.removeSkipToasts.errorToast.title`), t(`${textData}toasts.removeSkipToasts.errorToast.description`))
    }
  }
  const removeSubscriptionCoupon = async (subscriptionId: number, textData: string, t: ComposerTranslation) => {
    try {
      await executeRemoveSubscriptionCoupon(subscriptionId)
      successToast(toast, t(`${textData}addCoupon.successToast.remove.title`), t(`${textData}addCoupon.successToast.remove.description`))
    }
    catch (error) {
      console.log('Error on removing subscription coupon', error)
      errorToast(toast, t(`${textData}removeCoupon.errorToast.title`), t(`${textData}removeCoupon.errorToast.description`))
    }
  }

  return {
    addSubscriptionCoupon,
    addSubscriptionItem,
    cancelDonation,
    cancelSubscription,
    donateToONG,
    giveOrderToFriend,
    pauseSubscription,
    removeSkip,
    removeSubscriptionCoupon,
    skipAnOrder,
    unpauseSubscription,
    updatePeriodicity,
    updatePayment,
    updateBillingMeta,
    updateSubscriptionCoverage,
    updateShippingMeta,
    updateSubscriptionItem,
  }
}
