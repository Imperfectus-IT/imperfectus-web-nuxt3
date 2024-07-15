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
      <div v-if="!isEditForm">
        <p class="mt-5">
          {{ $t(`${textData.section}item_${index}`) }}
        </p>
        <p class="font-bold mt-1">
          {{ getShippingValue(item.key) }}
        </p>
      </div>
      <div
        v-else
        class="mt-2"
      >
        <div v-if="item.key !== 'shippingNotes'">
          <span>{{ $t(`${textData.section}item_${index}`) }} </span>
          <InputText
            v-model="shippingInfo[item.key as keyof OrderShipping]"
            :label="$t(`${textData.section}item_${index}`)"
            class="mt-2 rounded-lg w-full mb-4"
            :pt="{
              root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
            }"
          />
        </div>
        <div v-else>
          <span>{{ $t(`${textData.section}item_${index}`) }} </span>
          <Textarea
            v-model="shippingInfo[item.key as keyof OrderShipping]"
            class="w-full text-[16px] mt-2 rounded-lg mb-4"
            :pt="{
              root: 'bg-transparent border-[1px] rounded-lg p-3',
            }"
            rows="5"
          />
        </div>
      </div>
    </div>
    <Button
      v-if="!isEditForm"
      class="h-7 mt-6 mb-2"
      outlined
      :label="$t(textData.section + 'editButton')"
      @click="displayShippingForm"
    />
    <Button
      v-else
      class="h-7 mt-6 mb-2"
      outlined
      :label="$t(textData.section + 'saveButton')"
      @click="updateShippingInfo"
    />
  </Panel>
</template>

<script setup lang="ts">
import type { OrderShipping } from '~/composables/admin/orders/types/OrderType.ts'

const props = defineProps<{
  data: OrderShipping
  orderId: number
  header?: string
}>()

const isEditForm = ref(false)

const shippingInfo = reactive<OrderShipping>({
  shippingFirstName: props.data.shippingFirstName,
  shippingLastName: props.data.shippingLastName,
  shippingNotes: props.data.shippingNotes,
  shippingAddress2: props.data.shippingAddress2,
  shippingCountry: props.data.shippingCountry,
  shippingState: props.data.shippingState,
  shippingEmail: props.data.shippingEmail,
  shippingPhone: props.data.shippingPhone,
  shippingAddress: props.data.shippingAddress,
  shippingPostCode: props.data.shippingPostCode,
  shippingCity: props.data.shippingCity,
  shippingCoverage: props.data.shippingCoverage,
})

const { isDesktop } = useScreenSize()
const textData = {
  section: 'orders.order.shipping.',
  items: [
    { key: 'shippingFirstName' },
    { key: 'shippingLastName' },
    { key: 'shippingEmail' },
    { key: 'shippingPhone' },
    { key: 'shippingAddress' },
    { key: 'shippingAddress2' },
    { key: 'shippingPostCode' },
    { key: 'shippingCity' },
    { key: 'shippingNotes' },

  ],
}
const emit = defineEmits(['editShippingInfo'])

const displayShippingForm = () => {
  isEditForm.value = true
}

const updateShippingInfo = () => {
  emit('editShippingInfo', { ...shippingInfo, order: props.orderId })
  isEditForm.value = false
}

const getShippingValue = (key: string) => {
  return props.data[key as keyof OrderShipping]
}
</script>
