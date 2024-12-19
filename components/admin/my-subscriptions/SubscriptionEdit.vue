<template>
  <div v-if="!subscription">
    <CardSkeleton />
  </div>
  <div
    v-else
    class=" mx-auto flex flex-col gap-3"
  >
    <h4 class="font-recoleta-regular text-[43px]">
      {{ $t(`${textData}title`) }}
    </h4>
    <SubscriptionHeader
      :subscription="subscription"
    />
    <p class="my-3 lg:border-[1px] lg:p-4 lg:rounded-lg">
      {{ $t(`${textData}description`) }}
    </p>
    <SubscriptionDetails :subscription="subscription" />
    <SubscriptionModifyItem
      :subscription="subscription"
      @save-modify-item="handleUpdateSubscriptionItem"
    />
    <div class="flex flex-col gap-3 lg:grid lg:grid-cols-3">
      <SubscriptionModifyPeriodicity
        :subscription="subscription"
        class="lg:row-span-2 lg:h-[400px]"
        @save-modify-periodicity="updateSubscriptionPeriodicity"
      />
      <SubscriptionShippingCoverage
        class="lg:col-span-3 lg:row-start-1"
        :available-coverages="availableShippingCoverages"
        :subscription-shipping-coverage="props.subscription.shippingCoverage"
        :postcode="props.subscription.shippingInfo.shippingPostCode"
        @update-coverage="handleUpdateSubscriptionCoverage"
      />
      <SubscriptionUpdateShippingCoverageModal
        :is-visible="isUpdateCoverageModalVisible"
        :subscription-id="props.subscription.id"
        @close-modal="isUpdateCoverageModalVisible = false"
      />
      <SubscriptionCoupon
        class="lg:col-span-2"
        :subscription-coupon="subscription.subscriptionItems[0].coupon"
        @apply-coupon="handleApplyCoupon"
        @remove-coupon="handleRemoveCoupon"
      />
      <SubscriptionPayment
        :payment="subscription.payment as Payment"
        class="lg:col-span-2"
        @payment-changed="updateSubscriptionPayment"
      />
    </div>
    <SubscriptionAddItem
      class="lg:col-start-2 lg:col-span-2 "
      :subscription="subscription"
      :can-remove-item="canRemoveItem"
      @save-add-item="handleAddSubscriptionItem"
      @remove-item="handleRemoveSubscriptionItem"
    />
    <div class="flex flex-col gap-3 lg:grid lg:grid-cols-2">
      <SubscriptionShipping
        :shipping="subscription.shippingInfo"
        @modify-shipping="handleUpdateSubscriptionShipping"
      />
      <SubscriptionBilling
        :billing="subscription.billingInfo"
        @modify-billing="handleUpdateSubscriptionBilling"
      />
      <SubscriptionPause
        v-if="subscription.status !== 'cancelled'"
        :subscription="subscription"
        @unpause-subscription="handleUnPauseSubscription"
        @open-pause-modal="openPauseModal"
      />
      <SubscriptionCancel
        :class="isSubscriptionCancelledModalStyle"
        :subscription="subscription"
        @open-cancel-modal="openCancelModal"
      />
    </div>
    <SubscriptionPauseModal
      :is-visible="isPauseModalVisible"
      :preferred-day="subscription.preferredDay"
      @close-modal="closePauseModal"
      @pause-subscription="handlePauseSubscription"
    />
    <SubscriptionOrderProcessing
      :is-visible="isOrderProcessingModalVisible"
      :title="$t('adminSubscriptionPause.title')"
      @close="closeSubscriptionOrderProcessingModal"
      @next="continuePauseSubscription"
    />
    <SubscriptionCancelModal
      :is-visible="isCancelModalVisible"
      @close-modal="closeCancelModal"
      @cancel-subscription="handleCancelSubscription"
    />
    <Toast />
  </div>
</template>

<script setup lang='ts'>
import dayjs from 'dayjs'
import type {
  Subscription,
  SubscriptionBilling, SubscriptionShipping,
} from '~/composables/admin/subscriptions/domain/SubscriptionTypes.ts'
import type { Periodicity } from '~/components/admin/my-subscriptions/types/Periodicity.ts'
import type { Payment } from '~/composables/payment/domain/Payment.ts'
import type {
  updateSubscriptionItemPayload,
} from '~/components/admin/my-subscriptions/partials/SubscriptionModifyItem.vue'
import type { addItemPayload } from '~/components/admin/my-subscriptions/partials/SubscriptionAddItem.vue'
import type { PauseSubscriptionPayload } from '~/components/admin/my-subscriptions/partials/SubscriptionPauseModal.vue'
import type { CancelSubscriptionPayload } from '~/components/admin/my-subscriptions/partials/SubscriptionCancelModal.vue'

const { addSubscriptionCoupon, cancelSubscription, updateBillingMeta, updatePeriodicity, updatePayment, updateSubscriptionItem, addSubscriptionItem, removeSubscriptionItem, pauseSubscription, unpauseSubscription, updateSubscriptionCoverage, updateShippingMeta, removeSubscriptionCoupon } = useUpdateSubscriptionHandler()
const { t } = useI18n()
const isPauseModalVisible = ref(false)
const isCancelModalVisible = ref(false)
const isOrderProcessingModalVisible = ref(false)
const props = defineProps<{
  subscription: Subscription
}>()

const canRemoveItem = computed(() => props.subscription.status !== 'cancelled' && props.subscription.subscriptionItems.length > 1)
const isSunday = computed(() => dayjs().day() === 0)
const isTodaySundaySkipped = computed(() => props.subscription.skip.includes(dayjs().format('YYYY-MM-DD')))

const { getDeliveryDateFromNextPayment } = useGetDeliveryDateFromNextPayment()
const { executeGetShippingCompanies } = useGetShippingCompanies()
const { shippingPostCode } = props.subscription.shippingInfo
const expectedDeliveryDate = computed(() => getDeliveryDateFromNextPayment(props.subscription.nextPayment, props.subscription.preferredDay))
const availableShippingCoverages = ref<string[]>([])
onMounted(async () => {
  availableShippingCoverages.value = await executeGetShippingCompanies(shippingPostCode, expectedDeliveryDate.value as string)
})

const subscriptionData = computed(() => props.subscription)
watch(subscriptionData, async () => {
  availableShippingCoverages.value = await executeGetShippingCompanies(shippingPostCode, expectedDeliveryDate.value as string)
}, { deep: true })

const textData = 'subscriptions.subscription.'
const isSubscriptionCancelledModalStyle = computed(() => props.subscription.status === 'cancelled' ? 'lg:col-span-2 lg:w-1/2 lg:mx-auto' : '')
const isUpdateCoverageModalVisible = ref(false)
const handleApplyCoupon = async (coupon: string) => {
  await addSubscriptionCoupon(props.subscription.id, coupon, textData, t)
}
const handlePauseSubscription = async (pauseSubscriptionData: PauseSubscriptionPayload) => {
  await pauseSubscription(pauseSubscriptionData, props.subscription.id, textData, t)
  closePauseModal()
}
const handleUnPauseSubscription = async (subscriptionId: number) => {
  const { preferredDay, nextPayment } = props.subscription
  await unpauseSubscription(subscriptionId, textData, t, preferredDay, nextPayment)
  closePauseModal()
}
const handleUpdateSubscriptionCoverage = async (newSubscriptionCoverage: SubscriptionCoverage) => {
  await updateSubscriptionCoverage(props.subscription.subscriptionMeta, newSubscriptionCoverage)
  isUpdateCoverageModalVisible.value = true
}
const handleCancelSubscription = async (cancelSubscriptionData: CancelSubscriptionPayload) => {
  await cancelSubscription(props.subscription.id, cancelSubscriptionData, textData, t)
  closeCancelModal()
}
const updateSubscriptionPeriodicity = async (periodicity: Periodicity) => await updatePeriodicity(props.subscription, periodicity, textData, t)
const updateSubscriptionPayment = async (paymentId: number) => {
  await updatePayment(props.subscription, paymentId, textData, t)
}
const handleRemoveCoupon = async () => await removeSubscriptionCoupon(props.subscription.id, textData, t)
const handleUpdateSubscriptionBilling = async (billing: SubscriptionBilling) => await updateBillingMeta(props.subscription.subscriptionMeta, billing, textData, t)
const handleUpdateSubscriptionShipping = async (shipping: SubscriptionShipping) => {
  await updateShippingMeta(props.subscription.subscriptionMeta, shipping, textData, t)
}
const handleUpdateSubscriptionItem = async (updateSubscriptionItemData: updateSubscriptionItemPayload) => await updateSubscriptionItem(updateSubscriptionItemData, textData, t)
const handleAddSubscriptionItem = async (newSubscriptionItem: addItemPayload) => await addSubscriptionItem(newSubscriptionItem, props.subscription.id, textData, t)
const closePauseModal = () => isPauseModalVisible.value = false
const closeCancelModal = () => isCancelModalVisible.value = false

const openPauseModal = () => {
  if (isSunday.value) {
    if (isTodaySundaySkipped.value) {
      isPauseModalVisible.value = true
    }
    else if (!isTodaySundaySkipped.value && props.subscription.frequency === 'weekly') {
      isOrderProcessingModalVisible.value = true
    }
    else if (!isTodaySundaySkipped.value && props.subscription.frequency === 'biweekly') {
      const isNextPaymentTodayOrInTwoWeeks = props.subscription.nextPayment === dayjs().format('YYYY-MM-DD') || props.subscription.nextPayment === dayjs().add(2, 'week').format('YYYY-MM-DD')
      isNextPaymentTodayOrInTwoWeeks ? isOrderProcessingModalVisible.value = true : isPauseModalVisible.value = true
    }
  }
  else {
    isOrderProcessingModalVisible.value = true
  }
}
const openCancelModal = () => isCancelModalVisible.value = true

const handleRemoveSubscriptionItem = async (item: SubscriptionItem) => await removeSubscriptionItem(item.id, textData, t)

const closeSubscriptionOrderProcessingModal = () => isOrderProcessingModalVisible.value = false

const continuePauseSubscription = () => {
  isOrderProcessingModalVisible.value = false
  isPauseModalVisible.value = true
}
</script>
