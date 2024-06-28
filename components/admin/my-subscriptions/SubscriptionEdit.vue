<template>
  <div v-if="!subscription">
    <CardSkeleton />
  </div>
  <div
    v-else
    class="px-6 lg:max-w-[1200px] mx-auto flex flex-col gap-3"
  >
    <h4 class="font-recoleta-regular text-[43px]">
      {{ $t(`${textData}title`) }}
    </h4>
    <SubscriptionHeader :subscription="subscription" />
    <p class="mt-7">
      {{ $t(`${textData}description`) }}
    </p>

    <!--    Date picker -->
    <SubscriptionDetails :subscription="subscription" />
    <SubscriptionModifyItem :subscription="subscription" />
    <SubscriptionModifyPeriodicity
      :subscription="subscription"
      @save-modify-periodicity="saveModifyPeriodicity"
    />
    <SubscriptionCoupon />
    <SubscriptionAddItem :subscription="subscription" />
    <SubscriptionPayment
      :payment="subscription.payment as Payment"
      @payment-changed="updateSubscriptionPayment"
    />
    <SubscriptionBilling
      :billing="subscription.billingInfo"
      @modify-billing="updateSubscriptionBilling"
    />
    <SubscriptionShipping :shipping="subscription.shippingInfo" />
    <SubscriptionPause />
    <SubscriptionCancel />
  </div>
</template>

<script setup lang='ts'>
import type { Subscription, SubscriptionBilling } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'
import type { Periodicity } from '~/components/admin/my-subscriptions/types/Periodicity.ts'
import type { Payment } from '~/composables/payment/types/Payment.ts'

const { executeUpdatePeriodicity, executeUpdatePayment, executeUpdateBillingMeta } = useUpdateSubscription()

const props = defineProps<{
  subscription: Subscription
}>()

const textData = 'subscriptions.subscription.'

const saveModifyPeriodicity = async (payload: Periodicity) => {
  await executeUpdatePeriodicity(props.subscription, payload)
}

const updateSubscriptionPayment = async (paymentId: number) => {
  await executeUpdatePayment(props.subscription, paymentId)
}

const updateSubscriptionBilling = async (billing: SubscriptionBilling) => {
  console.log(billing)
  await executeUpdateBillingMeta(props.subscription.subscriptionMeta, billing)
}
</script>
