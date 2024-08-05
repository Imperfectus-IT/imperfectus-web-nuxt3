<template>
  <Panel>
    <h4 class="text-[26px] font-recoleta-medium whitespace-normal leading-[36px]">
      {{ $t('subscriptions.subscription.addItem.title') }}
    </h4>

    <SubscriptionItemCard
      v-for="item in props.subscription.subscriptionItems"
      :key="item.id"
      :subscription-item="item"
      :preferred-day="props.subscription.preferredDay"
      :subscription-status="props.subscription.status"
      class="mt-4"
    />
    <Divider class="-mt-0" />
    <Button
      v-if="!isAddFormDisplayed"
      :pt="{
        root: 'border-[1px] px-3.5 py-2.5 rounded-lg my-3 bg-green-primary w-1/2 lg:w-40',
      }"
      :label="$t('subscriptions.subscription.addItem.button')"
      @click="displayAddForm"
    />
    <SubscriptionNewItem
      v-if="isAddFormDisplayed"
      :frequency="props.subscription.frequency"
      @close="closeAddForm"
      @save="handleSave"
    />
  </Panel>
</template>

<script setup lang="ts">
import type { Subscription } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

const props = defineProps<{
  subscription: Subscription
}>()
const emits = defineEmits(['save-add-item'])
const isAddFormDisplayed = ref<boolean>(false)
const displayAddForm = () => {
  isAddFormDisplayed.value = true
}
const closeAddForm = () => {
  isAddFormDisplayed.value = false
}
const handleSave = (newItem: addItemPayload) => {
  emits('save-add-item', newItem)
  isAddFormDisplayed.value = false
}

export type addItemPayload = {
  boxProduct: BoxProduct
  exclusions: number[]
}
</script>
