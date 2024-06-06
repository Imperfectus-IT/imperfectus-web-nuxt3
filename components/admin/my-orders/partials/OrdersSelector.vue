<template>
  <div class="mt-3 flex flex-row gap-7">
    <Button
      :class="ordersSelected === 'all' ? 'font-bold' : ''"
      :label="`Todos (${availableOrders.total.value})`"
      :pt="{ root: '', label: '' }"
      @click="selectOrders('all')"
    />
    <Button
      :class="ordersSelected === 'current' ? 'font-bold' : ''"
      :label="`Actuales (${availableOrders.current.value})`"
      :pt="{ root: '', label: '' }"
      @click="selectOrders('current')"
    />
    <Button
      :class="ordersSelected === 'past' ? 'font-bold' : ''"
      :label="`Pasados (${availableOrders.past.value})`"
      :pt="{ root: '', label: '' }"
      @click="selectOrders('past')"
    />
  </div>
  <Divider class="mt-1" />
</template>

<script setup lang="ts">
defineProps<{
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
