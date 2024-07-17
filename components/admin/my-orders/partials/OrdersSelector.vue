<template>
  <div class="lg:max-w-[340px]">
    <div class="mt-3 flex flex-row gap-7 ">
      <Button
        :class="ordersSelected === 'all' ? 'font-bold' : ''"
        :label="$t('orders.ordersSelector.all', { quantity: props.availableOrders.total.value })"
        :pt="{ root: '', label: '' }"
        @click="selectOrders('all')"
      />
      <Button
        :class="ordersSelected === 'current' ? 'font-bold' : ''"
        :label="$t('orders.ordersSelector.current', { quantity: props.availableOrders.current.value })"
        :pt="{ root: '', label: '' }"
        @click="selectOrders('current')"
      />
      <Button
        :class="ordersSelected === 'past' ? 'font-bold' : ''"
        :label="$t('orders.ordersSelector.past', { quantity: props.availableOrders.past.value })"
        :pt="{ root: '', label: '' }"
        @click="selectOrders('past')"
      />
    </div>
    <Divider class="mt-1" />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

const props = defineProps<{
  availableOrders: {
    past: Ref<number>
    current: Ref<number>
    total: Ref<number>
  }
}>()

const emit = defineEmits(['selectedOrders'])
type OrdersSelectedOptions = 'all' | 'current' | 'past'
const ordersSelected = ref<OrdersSelectedOptions>('all')
const selectOrders = (type: OrdersSelectedOptions) => {
  ordersSelected.value = type
  emit('selectedOrders', ordersSelected.value)
}
</script>
