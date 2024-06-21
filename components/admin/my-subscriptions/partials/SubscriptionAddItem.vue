<template>
  <Panel>
    <h4 class="text-[26px] font-recoleta-medium whitespace-normal leading-[36px]">
      {{ $t('subscriptions.subscription.addItem.title') }}
    </h4>

    <SubscriptionItemCard
      v-for="item in props.subscription.subscriptionItems"
      :key="item.id"
      :subscription-item="item"
      :next-delivery-date="''"
      :preferred-day="props.subscription.preferredDay"
      :subscription-status="props.subscription.status"
      class="mt-4"
    />
    <Button
      :pt="{
        root: 'border-[1px] px-3.5 py-2.5 rounded-lg my-3 bg-green-primary w-1/2',
      }"
      :label="$t('subscriptions.subscription.addItem.button')"
    />
  </Panel>
</template>

<script setup lang="ts">
import type { Subscription } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

const props = defineProps<{
  subscription: Subscription
}>()
</script>
