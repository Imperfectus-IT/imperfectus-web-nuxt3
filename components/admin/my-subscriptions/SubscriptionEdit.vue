<template>
  <div v-if="!subscription">
    <CardSkeleton />
  </div>
  <div
    v-else
    class="lg:max-w-[1100px] mx-auto flex flex-col gap-3"
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
    <SubscriptionModifyItem :subscription="subscription" />
    <div class="flex flex-col gap-3 lg:grid lg:grid-cols-3">
      <SubscriptionModifyPeriodicity
        :subscription="subscription"
        class="lg:row-span-2 lg:h-[400px]"
        @save-modify-periodicity="saveModifyPeriodicity"
      />
      <SubscriptionCoupon class="lg:col-span-2" />
      <SubscriptionAddItem
        class="lg:col-start-2 lg:col-span-2 "
        :subscription="subscription"
      />
    </div>
    <SubscriptionPayment
      :payment="subscription.payment as Payment"
      @payment-changed="updateSubscriptionPayment"
    />
    <div class="flex flex-col gap-3 lg:grid lg:grid-cols-2">
      <SubscriptionBilling
        :billing="subscription.billingInfo"
        @modify-billing="updateSubscriptionBilling"
      />
      <SubscriptionShipping :shipping="subscription.shippingInfo" />
      <SubscriptionPause @open-pause-modal="openPauseModal" />
      <SubscriptionCancel @open-cancel-modal="openCancelModal" />
    </div>
    <SubscriptionPauseModal
      :is-visible="isPauseModalVisible"
      @close-modal="closePauseModal"
    />
    <SubscriptionCancelModal
      :is-visible="isCancelModalVisible"
      @close-modal="closeCancelModal"
    />
  </div>
</template>

<script setup lang='ts'>
import type { Subscription, SubscriptionBilling } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'
import type { Periodicity } from '~/components/admin/my-subscriptions/types/Periodicity.ts'
import type { Payment } from '~/composables/payment/types/Payment.ts'
import {
  useGetAllAvailabilityHandler,
} from '~/composables/shared/availableDates/get-all/useGetAllAvailabilityHandler.ts'

const { handleGetAllAvailability } = useGetAllAvailabilityHandler()
const { executeUpdatePeriodicity, executeUpdatePayment, executeUpdateBillingMeta } = useUpdateSubscription()
const isPauseModalVisible = ref(false)
const isCancelModalVisible = ref(false)
const props = defineProps<{
  subscription: Subscription
}>()
// onMounted(async () => {
//   const postCode = props.subscription.shippingInfo.shippingPostCode
//   const carrier = 'correosexp'
//   const product = '3'
//   const test = await handleGetAllAvailability(postCode, product, carrier)
//   console.log('test', test)
// })
const textData = 'subscriptions.subscription.'
const saveModifyPeriodicity = async (payload: Periodicity) => {
  await executeUpdatePeriodicity(props.subscription, payload)
}
const updateSubscriptionPayment = async (paymentId: number) => {
  await executeUpdatePayment(props.subscription, paymentId)
}
const updateSubscriptionBilling = async (billing: SubscriptionBilling) => {
  await executeUpdateBillingMeta(props.subscription.subscriptionMeta, billing)
}
const closePauseModal = () => {
  isPauseModalVisible.value = false
}
const closeCancelModal = () => {
  isCancelModalVisible.value = false
}
const openPauseModal = () => {
  isPauseModalVisible.value = true
}
const openCancelModal = () => {
  isCancelModalVisible.value = true
}
</script>
