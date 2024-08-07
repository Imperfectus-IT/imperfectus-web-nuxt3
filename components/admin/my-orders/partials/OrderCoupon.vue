<template>
  <h4
    v-if="showTitle"
    class="text-[14px] whitespace-normal font-bold mt-4"
  >
    {{ $t('orderCoupon.message') }}
  </h4>
  <InputGroup :class="['my-2 lg:w-full flex flex-row', validCouponStyle]">
    <InputText
      v-model="coupon"
      :disabled="isInputDisabled"
      :class="['rounded-l-xl max-h-[42px] lg:w-2/3', validCouponStyle]"
      :placeholder="$t('orderCoupon.placeholder')"
    />
    <Button
      v-if="!orderCoupon"
      :label="$t('orders.order.coupon.buttonAdd')"
      :pt="{ root: 'hover:bg-green-tertiary hover:text-green-primary bg-green-primary max-h-[42px] font-solina-extended-book text-[14px] px-4 p-2.5 lg:py-[11px] border-[1px] border-green-tertiary rounded-r-lg' }"
      @click="addOrderCoupon"
    />
    <Button
      v-if="orderCoupon"
      :label="$t('orders.order.coupon.buttonRemove')"
      :pt="{ root: 'bg-orange-primary hover:bg-green-tertiary hover:text-orange-primary max-h-[42px] font-solina-extended-book text-[14px] px-4 p-2.5 lg:py-[11px] border-[1px] border-green-tertiary rounded-r-lg' }"
      @click="removeOrderCoupon"
    />
  </InputGroup>
  <span
    v-if="isSetValidationError"
    :class="['text-base', !isValidationError ? 'text-green-secondary' : 'text-red-primary']"
  >
    {{ validationMessage?.message }}
  </span>
</template>

<script setup lang='ts'>
const props = defineProps({
  showTitle: {
    type: Boolean,
    default: true,
  },
  orderCoupon: {
    type: Object as () => Coupon,
    required: false,
  },
  validationMessage: {
    type: Object,
    required: false,
  }
})

const isSetValidationError = computed(() => props.validationMessage?.status !== null)
const isValidationError = computed(() => props.validationMessage?.status === ERROR_MESSAGE_STATUS)

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

const validCouponStyle = computed(() => {
  if (!isSetValidationError.value) {
    return 'border-green-tertiary'
  }
  return !isValidationError.value ? '!border-green-secondary' : '!border-red-primary'
})
</script>
