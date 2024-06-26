<template>
  <Panel>
    <h4 class="text-[26px] font-recoleta-medium">
      {{ $t('subscriptions.subscription.modifyItem.title') }}
    </h4>
    <div
      v-for="item in props.subscription.subscriptionItems"
      :key="item.id"
    >
      <SubscriptionItemCard
        :subscription-item="item"
        :next-delivery-date="''"
        :preferred-day="props.subscription.preferredDay"
        :subscription-status="props.subscription.status"
        class="mt-4"
      />
      <Button
        :pt="{
          root: 'border-[1px] px-3.5 py-2.5  rounded-lg my-3',
        }"
        outlined
        :label="$t('subscriptions.subscription.modifyItem.button')"
      />
    </div>
  </Panel>
</template>

<script setup lang="ts">
import type { Subscription } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

const props = defineProps<{
  subscription: Subscription
}>()
</script>
