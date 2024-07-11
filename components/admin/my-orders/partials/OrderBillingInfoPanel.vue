<template>
  <Panel
    :header="props.header ? props.header : $t(props.labelKey + '.header')"
    :toggleable="isDesktop"
    :collapsed="isDesktop"
  >
    <div
      v-for="(item, index) in textData"
      :key="index"
      class="flex flex-col text-[14px]"
    >
      <p class="mt-5">
        {{ $t(`${props.labelKey}.item_${index}`) }}
      </p>
      <p class="font-bold mt-1">
        {{ getBillingInfoValue(item.key) }}
      </p>
    </div>
    <Button
      class="h-7 mt-6 mb-2"
      outlined
      :label="$t(props.labelKey + '.button_label')"
      @click="displayBillingInfoForm"
    />
  </Panel>
</template>

<script setup lang="ts">
import type { OrderBilling } from '~/composables/admin/orders/types/OrderType.ts'

const { isDesktop } = useScreenSize()

const props = defineProps<{
  data: OrderBilling
  header?: string
  labelKey: string
}>()

const textData = [
  { key: 'billingFirstName' },
  { key: 'billingEmail' },
  { key: 'billingPhone' },
  { key: 'billingAddress' },
  { key: 'billingPostCode' },
  { key: 'billingCity' },
]

const emit = defineEmits(['editBillingInfo'])

const getBillingInfoValue = (key: string) => {
  return props.data[key as keyof OrderBilling]
}

const displayBillingInfoForm = () => {
  emit('editBillingInfo')
}
</script>
