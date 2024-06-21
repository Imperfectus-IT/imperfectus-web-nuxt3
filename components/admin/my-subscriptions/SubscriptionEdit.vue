<template>
  <div v-if="!subscription">
    <CardSkeleton />
  </div>
  <div
    v-else
    class="px-6 lg:max-w-[1200px] mx-auto"
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
    <SubscriptionPayment :payment="subscription.payment" />
    <SubscriptionShipping />
    <SubscriptionBilling />
  </div>
</template>

<script setup lang='ts'>
import type { Subscription } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'
import type { Periodicity } from '~/components/admin/my-subscriptions/types/Periodicity.ts'

const { executeUpdatePeriodicity } = useUpdateSubscription()

const props = defineProps<{
  subscription: Subscription
}>()

const textData = 'subscriptions.subscription.'

const saveModifyPeriodicity = (payload: Periodicity) => {
  console.log('subscription', props.subscription)
  console.log('saveModifyPeriodicity', payload)
  executeUpdatePeriodicity(props.subscription, payload)
}
</script>
