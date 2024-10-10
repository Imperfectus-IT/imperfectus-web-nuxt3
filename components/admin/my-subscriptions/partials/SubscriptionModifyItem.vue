<template>
  <Panel>
    <h4 class="text-[26px] font-recoleta-medium">
      {{ $t(`${textData}title`) }}
    </h4>
    <div
      v-for="item in props.subscription.subscriptionItems"
      :key="item.id"
      :class="!selectedItemId ? 'lg:flex lg:justify-between lg:items-center' : ''"
    >
      <h4
        v-if="selectedItemId === item.id"
        class="!font-bold text-[16px] mt-7 mb-4"
      >
        {{ $t(`${textData}selected`) }}
      </h4>
      <SubscriptionItemCard
        :subscription-item="item"
        :subscription-status="props.subscription.status"
        class="mt-4"
      />
      <Button
        v-if="!selectedItemId"
        :pt="{
          root: 'w-1/3 border-[1px] px-3.5 py-2.5  rounded-lg mb-10 -mt-5 lg:w-24 lg:mt-0 lg:h-10',
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
        :frequency="props.subscription.frequency"
        @save="handleSave"
        @close="handleClose"
      />
    </div>
  </Panel>
</template>

<script setup lang="ts">
import type { Subscription } from '~/composables/admin/subscriptions/domain/SubscriptionTypes.ts'
import type { BoxProduct } from '~/composables/admin/products/types/Product.ts'

const emits = defineEmits(['save-modify-item'])
const props = defineProps<{
  subscription: Subscription
}>()
const textData = 'subscriptions.subscription.modifyItem.'
const selectedItemId = ref<number | null>(null)

const displayEditItem = (itemId: number) => {
  selectedItemId.value = itemId
}

const handleSave = (updateSubscriptionItemData: updateSubscriptionItemPayload) => {
  emits('save-modify-item', updateSubscriptionItemData)
  selectedItemId.value = null
}

const handleClose = () => {
  selectedItemId.value = null
}

export type updateSubscriptionItemPayload = {
  newBoxProduct: BoxProduct
  subscriptionItemId: number
  exclusions: number[]
}
</script>
