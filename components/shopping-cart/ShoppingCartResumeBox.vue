<script setup lang="ts">
import { useGetLocaleLanguage } from '~/composables/shared/useGetLocaleLanguage.ts'
import { useValidateCouponHandler } from '~/composables/shared/coupons/application/validate/useValidateCouponHandler.ts'
import { useGetOrderAmount } from '~/composables/admin/orders/application/getOrderAmount/useGetOrderAmount.ts'
import { createEmpty as createEmptyShoppingCartItem } from '@/composables/shopping-cart/domain/Item.ts'

const { t } = useI18n()
const emit = defineEmits(['goToNextStep', 'addNewProduct'])
const goToNextStep = () => {
  emit('goToNextStep')
}
const addNewProduct = () => {
  emit('addNewProduct')
}

defineProps<{
  displayNextStepButton: boolean
}>()

const { shoppingCart } = useShoppingCartState()
const { validateCoupon } = useValidateCouponHandler(t)
const { executeGetOrderAmount } = useGetOrderAmount()
const getSubtotal = computed(() => {
  return shoppingCart.value.items.reduce((acc, item) => acc + item.product.price, 0)
})

const amount = reactive({
  shippingCost: 0,
  saved: 0,
  total: 0,
})

const handleAddOrderCoupon = async (coupon: string) => {
  const couponValidateData: ValidateCouponPayload = {
    coupon,
    user: useStrapiUser().value,
    postcode: shoppingCart.value.shippingAddress.postalCode,
    items: shoppingCart.value.items.map(item => item.product.sku),
  }
  await validateCoupon(couponValidateData)
  const newAmount = await executeGetOrderAmount({ items: shoppingCart.value.items })
  amount.shippingCost = newAmount.shipping
  amount.saved = newAmount.saved
  amount.total = newAmount.total
}

const handleRemoveCoupon = () => {
  shoppingCart.value.currentItem.coupon = null
  amount.saved = 0
  amount.total = getSubtotal.value
  amount.shippingCost = 0
}
</script>

<template>
  <div>
    <slot name="title" />
    <slot name="boxCard" />
    <Button
      :label="$t('orderResume.add')"
      outlined
      class="lg: mb-10"
      @click.prevent="addNewProduct"
    />
    <OrderCoupon
      :show-title="false"
      :order-coupon="shoppingCart.currentItem.coupon"
      @add-coupon="handleAddOrderCoupon"
      @remove-coupon="handleRemoveCoupon"
    />
    <Divider class="text-grey-secondary mt-7" />
    <div class="flex justify-between">
      <span>{{ $t('orderAmount.subtotal') }}</span>
      <span>{{ getSubtotal }}€</span>
    </div>
    <div class="flex justify-between mt-2">
      <span>{{ $t('orderAmount.shippingCost') }}</span>
      <span>{{ amount.shippingCost }}€</span>
    </div>
    <div class="flex justify-between mt-2">
      <span>{{ $t('orderAmount.discount') }}</span>
      <span>{{ amount.saved }}€</span>
    </div>
    <Divider class="text-grey-secondary" />
    <div class="flex justify-between text-[22px] font-solina-extended-medium">
      <span>{{ $t('orderAmount.total') }}</span>
      <span>{{ amount.total || getSubtotal }}€</span>
    </div>
    <div class="flex justify-center">
      <Button
        v-if="displayNextStepButton"
        :label="$t('order.next')"
        severity="secondary"
        class="mt-4"
        @click.prevent="goToNextStep"
      />
    </div>
  </div>
</template>
