<template>
  <Panel>
    <h4 class="text-[26px] font-recoleta-medium">
      {{ $t('subscriptions.subscription.modifyItem.title') }}
    </h4>
    <div
      v-for="item in props.subscription.subscriptionItems"
      :key="item.id"
      :class="!selectedItemId ? 'lg:flex lg:justify-between lg:items-center' : ''"
    >
      <SubscriptionItemCard
        :subscription-item="item"
        :subscription-status="props.subscription.status"
        class="mt-4"
      />
      <Button
        v-if="!selectedItemId"
        :pt="{
          root: 'w-1/3 border-[1px] px-3.5 py-2.5  rounded-lg mb-10 -mt-5 lg:px-6 lg:w-1/5 lg:mt-0 lg:h-12',
        }"
        outlined
        :label="$t('subscriptions.subscription.modifyItem.button')"
        @click="displayEditItem(item.id)"
      />
      <SubscriptionItemEdit
        v-if="selectedItemId === item.id"
        :key="item.id"
        :exclusions="item.exclusions"
        :subscription-item="item"
        @save="handleSave"
        @close="handleClose"
      />
    </div>
  </Panel>
</template>

<script setup lang="ts">
import type { Subscription } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

const props = defineProps<{
  subscription: Subscription
}>()

const selectedItemId = ref<number | null>(null)

const displayEditItem = (itemId: number) => {
  selectedItemId.value = itemId
}

const handleSave = () => {
  selectedItemId.value = null
}

const handleClose = () => {
  selectedItemId.value = null
}
</script>
