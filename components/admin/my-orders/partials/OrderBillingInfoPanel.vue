<template>
  <Panel
    :header="props.header ? props.header : $t(textData.section + 'header')"
    :toggleable="isDesktop"
    :collapsed="isDesktop"
  >
    <div
      v-for="(item, index) in textData.items"
      :key="index"
      class="flex flex-col text-[14px]"
    >
      <div v-if="!isEditForm">
        <p class="mt-5">
          {{ $t(`${textData.section}item_${index}`) }}
        </p>
        <p class="font-bold mt-1">
          {{ getBillingValue(item.key) }}
        </p>
      </div>
      <div v-else>
        <span>{{ $t(`${textData.section}item_${index}`) }} </span>
        <InputText
          v-model="billingInfo[item.key as keyof OrderBilling]"
          :label="$t(`${textData.section}item_${index}`)"
          class="mt-2 rounded-lg w-full mb-4"
          :pt="{
            root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
          }"
        />
      </div>
    </div>
    <Button
      v-if="!isEditForm"
      class="h-7 mt-6 mb-2"
      outlined
      :label="$t(textData.section + 'buttonModify')"
      @click="displayBillingForm"
    />
    <Button
      v-if="isEditForm"
      class="h-7 mt-6 mb-2"
      outlined
      :label="$t(textData.section + 'buttonSave')"
      @click="updateBillingInfo"
    />
  </Panel>
</template>

<script setup lang="ts">
import type { OrderBilling } from '~/composables/admin/orders/types/OrderType.ts'

const { isDesktop } = useScreenSize()
const isEditForm = ref(false)
const props = defineProps<{
  data: OrderBilling
  header?: string
}>()

const billingInfo = reactive<OrderBilling>({
  billingPostCode: props.data.billingPostCode,
  billingLastName: props.data.billingLastName,
  billingFirstName: props.data.billingFirstName,
  billingEmail: props.data.billingEmail,
  billingPhone: props.data.billingPhone,
  billingAddress: props.data.billingAddress,
  billingAddress2: props.data.billingAddress2,
  billingCity: props.data.billingCity,
  billingState: props.data.billingState,
  billingCif: props.data.billingCif,
  billingCountry: props.data.billingCountry,
})

const textData = {
  section: 'orders.order.billingInfo.',
  items: [
    { key: 'billingFirstName' },
    { key: 'billingLastName' },
    { key: 'billingEmail' },
    { key: 'billingPhone' },
    { key: 'billingAddress' },
    { key: 'billingAddress2' },
    { key: 'billingPostCode' },
    { key: 'billingCity' },
  ],
}

const emit = defineEmits(['editBillingInfo'])
const displayBillingForm = () => isEditForm.value = true

const updateBillingInfo = () => {
  emit('editBillingInfo', billingInfo)
  isEditForm.value = false
}

const getBillingValue = (key: string) => {
  return props.data[key as keyof OrderBilling]
}
</script>
