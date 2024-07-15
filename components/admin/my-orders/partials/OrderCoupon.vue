<template>
  <h4
    v-if="showTitle"
    class="text-[14px] whitespace-normal font-bold mt-4"
  >
    {{ $t('orderCoupon.message') }}
  </h4>
  <InputGroup class="my-2 lg:w-ful flex flex-row">
    <InputText
      v-model="coupon"
      :disabled="isInputDisabled"
      class="rounded-l-xl max-h-[42px] lg:w-1/2"
      placeholder="¿Código de descuento?"
    />
    <Button
      v-if="!orderCoupon"
      :label="$t(`${textData}buttonAdd`)"
      :pt="{ root: 'hover:bg-green-tertiary hover:text-green-primary bg-green-primary max-h-[42px] font-solina-extended-book text-[14px] px-4 p-2.5 lg:py-[11px] border-[1px] border-green-tertiary rounded-r-lg' }"
      @click="addOrderCoupon"
    />
    <Button
      v-if="orderCoupon"
      :label="t(`${textData}buttonRemove`)"
      :pt="{ root: 'bg-orange-primary hover:bg-green-tertiary hover:text-orange-primary max-h-[42px] font-solina-extended-book text-[14px] px-4 p-2.5 lg:py-[11px] border-[1px] border-green-tertiary rounded-r-lg' }"
      @click="removeOrderCoupon"
    />
  </InputGroup>
</template>

<script setup lang='ts'>
import type { Coupon } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

const { t } = useI18n()
const props = defineProps({
  showTitle: {
    type: Boolean,
    default: true,
  },
  orderCoupon: {
    type: Object as () => Coupon,
    required: false,
  },
})
const textData = 'orders.order.coupon.'
const coupon = ref<string>(props.orderCoupon?.coupon || '')
const emits = defineEmits(['add-coupon', 'remove-coupon'])
const isInputDisabled = computed(() => {
  return !!props.orderCoupon
})
const addOrderCoupon = () => {
  emits('add-coupon', coupon.value)
}
const removeOrderCoupon = () => {
  emits('remove-coupon')
  coupon.value = ''
}
</script>
