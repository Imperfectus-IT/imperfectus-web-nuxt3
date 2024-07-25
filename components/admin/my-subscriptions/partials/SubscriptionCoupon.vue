<template>
  <Panel>
    <div>
      <h4 class="text-[26px] font-recoleta-medium whitespace-normal mb-4">
        {{ $t('subscriptions.subscription.addCoupon.title') }}
      </h4>
      <InputGroup class="my-2 lg:w-full flex flex-row">
        <InputText
          v-model="coupon"
          :readonly="isInputReadonly"
          class="rounded-l-xl max-h-[42px] lg:w-3/4"
          :placeholder="$t('subscriptions.subscription.addCoupon.placeholder')"
        />
        <Button
          v-if="!isInputReadonly"
          :label="$t('subscriptions.subscription.addCoupon.button')"
          :pt="{ label: ' text-[16px] lg:text-[18px]', root: 'max-h-[42px] font-solina-extended-book text-[14px] px-4 p-2.5 lg:py-[11px] bg-green-primary border-[1px] border-green-tertiary rounded-r-lg  hover:bg-green-tertiary hover:text-green-primary focus:bg-green-tertiary focus:text-green-primary' }"
          @click="applyCoupon"
        />
        <Button
          v-if="isInputReadonly"
          :label="$t('subscriptions.subscription.addCoupon.removeButton')"
          :pt="{ label: ' text-[16px] lg:text-[18px]', root: 'max-h-[42px] font-solina-extended-book text-[14px] px-4 p-2.5 lg:py-[11px] bg-orange-primary border-[1px] border-green-tertiary rounded-r-lg  hover:bg-green-tertiary hover:text-orange-primary focus:bg-green-tertiary focus:text-green-primary' }"
          @click="removeCoupon"
        />
      </InputGroup>
    </div>
  </Panel>
</template>

<script setup lang='ts'>
import type { Coupon } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

const props = defineProps<{
  subscriptionCoupon: Coupon | null
}>()
const coupon = ref<string>(props.subscriptionCoupon?.coupon || '')
const isInputReadonly = computed(() => {
  return !!props.subscriptionCoupon
})
const emits = defineEmits(['apply-coupon', 'remove-coupon'])
const applyCoupon = () => {
  emits('apply-coupon', coupon.value)
}
const removeCoupon = () => {
  emits('remove-coupon')
  coupon.value = ''
}
</script>
