<template>
  <Panel
    :header="props.header ? props.header : $t(textData.section + 'header')"
    :toggleable="isDesktop"
    :collapsed="isDesktop"
  >
    <div
      v-for="(item, index) in textData.items"
      :key="index"
      class="text-[14px] flex flex-col"
    >
      <p class="mt-5">
        {{ $t(`${textData.section}item_${index}`) }}
      </p>
      <p class="font-bold mt-1">
        {{ getShippingValue(item.key) }}
      </p>
    </div>

    <Button
      class="h-7 mt-6 mb-2"
      outlined
      :label="$t(textData.section + 'button_label')"
      @click="displayShippingInfoForm"
    />
  </Panel>
</template>

<script setup lang="ts">
import type { OrderShipping } from '~/composables/admin/orders/types/OrderType.ts'

const props = defineProps<{
  data: OrderShipping
  header?: string
}>()

const shippingInfo = reactive({
  firstName: props.data.shippingFirstName,
  email: props.data.shippingEmail,
  phone: props.data.shippingPhone,
  address: props.data.shippingAddress,
  cp: props.data.shippingPostCode,
  city: props.data.shippingCity,
})

const { isDesktop } = useScreenSize()
const textData = {
  section: 'orders.order.order_shipping.',
  items: [
    { key: 'shippingFirstName' },
    { key: 'shippingEmail' },
    { key: 'shippingPhone' },
    { key: 'shippingAddress' },
    { key: 'shippingPostCode' },
    { key: 'shippingCity' },
  ],
}
const emit = defineEmits(['editShippingInfo'])

const displayShippingInfoForm = () => {
  emit('editShippingInfo')
}

const getShippingValue = (key: string) => {
  return props.data[key as keyof OrderShipping]
}
</script>
