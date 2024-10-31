<script setup lang="ts">
import { useValidateCouponHandler } from '~/composables/shared/coupons/application/validate/useValidateCouponHandler.ts'
import { useGetOrderAmount } from '~/composables/admin/orders/application/getOrderAmount/useGetOrderAmount.ts'

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
watch(() => shoppingCart.value.items, async () => {
  const newAmount = await executeGetOrderAmount({ items: shoppingCart.value.items })
  shoppingCart.value.amount.shippingCost = newAmount.shipping
  shoppingCart.value.amount.saved = newAmount.saved
  shoppingCart.value.amount.total = newAmount.total
}, { deep: true })

const handleAddOrderCoupon = async (coupon: string) => {
  try {
    const couponValidateData: ValidateCouponPayload = {
      coupon,
      user: useStrapiUser().value,
      postcode: shoppingCart.value.shippingAddress.shippingPostCode,
      items: shoppingCart.value.items.map((item) => {
        return {
          product: item.product.id as number,
        }
      }),
    }
    await validateCoupon(couponValidateData)
  }
  catch (error) {
    console.error('Error on adding Coupon', error)
  }
}

const handleRemoveCoupon = () => {
  const { items } = shoppingCart.value
  shoppingCart.value.items = items.map((item) => {
    item.coupon = null
    return item
  })
  shoppingCart.value.amount.subtotal = shoppingCart.value.items.reduce((acc, item) => acc + (item.product.priceWithTax * item.quantity), 0)
  shoppingCart.value.amount.saved = 0
  shoppingCart.value.amount.total = shoppingCart.value.amount.subtotal
  shoppingCart.value.amount.shippingCost = 0
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
      :order-coupon="shoppingCart.items[0].coupon"
      @add-coupon="handleAddOrderCoupon"
      @remove-coupon="handleRemoveCoupon"
    />
    <p
      v-if="shoppingCart.items[0].coupon"
      class="text-green-secondary"
    >
      {{ shoppingCart.items[0].coupon.descriptionEs }}
    </p>
    <Divider class="text-grey-secondary mt-7" />
    <div class="flex justify-between">
      <span>{{ $t('orderAmount.subtotal') }}</span>
      <span>{{ shoppingCart.amount.subtotal }}€</span>
    </div>
    <div class="flex justify-between mt-2">
      <span>{{ $t('orderAmount.shippingCost') }}</span>
      <span>{{ shoppingCart.amount.shippingCost }}€</span>
    </div>
    <div class="flex justify-between mt-2">
      <span>{{ $t('orderAmount.discount') }} {{ shoppingCart.items[0]?.coupon?.discountValue }}%</span>
      <span :class="shoppingCart.amount.saved > 0 ? 'text-green-secondary' : ''">{{ shoppingCart.amount.saved }}€</span>
    </div>
    <Divider class="text-grey-secondary" />
    <div class="flex justify-between text-[22px] font-solina-extended-medium">
      <span>{{ $t('orderAmount.total') }}</span>
      <span>{{ shoppingCart.amount.total }}€</span>
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
