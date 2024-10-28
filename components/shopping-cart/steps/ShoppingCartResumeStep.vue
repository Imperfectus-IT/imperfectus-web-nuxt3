<script setup lang="ts">
import { useGetLocaleLanguage } from '~/composables/shared/useGetLocaleLanguage.ts'
import { useValidateCouponHandler } from '~/composables/shared/coupons/application/validate/useValidateCouponHandler.ts'
import { useGetOrderAmount } from '~/composables/admin/orders/application/getOrderAmount/useGetOrderAmount.ts'
import { createEmpty as createEmptyShoppingCartItem } from '@/composables/shopping-cart/domain/Item.ts'

const toast = useToast()
const { errorToast, successToast } = useToastService()
const { t } = useI18n()
const emit = defineEmits([GO_TO_STEP_EVENT])
const goToNextStep = () => {
  emit(GO_TO_STEP_EVENT, SHIPPING_STEP)
}
const goBack = () => {
  emit(GO_TO_STEP_EVENT, PURCHASE_TYPE_STEP)
}
const { locale } = useI18n()
const { shoppingCart } = useShoppingCartState()
const { getLocaleName } = useGetLocaleLanguage(locale)
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

const handleNewProduct = () => {
  emit(GO_TO_STEP_EVENT, CUSTOMIZE_STEP)
  shoppingCart.value.currentItem = createEmptyShoppingCartItem()
}

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
}

const removeItem = (id: string) => {
  if (shoppingCart.value.items.length === 1) {
    errorToast(toast, t('validations.one.item.required.title'), t('validations.one.item.required.description'))
  }
  else {
    shoppingCart.value.items = shoppingCart.value.items.filter(item => item.uuid !== id)
    successToast(toast, 'Producot eliminado', 'El producto ha sido eliminado correctamente')
  }
}
</script>

<template>
  <Toast />
  <div class="px-8 md:px-[28%] lg:px-[25%] 2xl:px-[20%] relative">
    <slot name="title" />
    <div class="!absolute left-[25px] lg:left-[35px] flex flex-row gap-3">
      <Button
        class="w-[2rem] h-[2rem] text-xl "
        icon="mdi mdi-chevron-left"
        rounded
        outlined
        @click.prevent="goBack"
      />
      <span class="my-auto hidden lg:block">{{ $t('string.back') }}</span>
    </div>
    <div
      v-for="(item, index) in shoppingCart.items"
      :key="index"
      class="lg:flex mb-5 lg:mb-0 lg:gap-16 lg:flex-wrap lg:justify-center"
    >
      <NuxtImg
        :src="item.product.image"
        loading="lazy"
        format="webp"
        class="rounded-lg mt-6 w-full lg:w-1/3"
      />
      <div class="p-4 lg:my-auto lg:p-0 lg:py-4 mt-5">
        <div class="flex justify-between items-center">
          <span class="font-bold my-3 lg:my-1 text-lg lg:text-md">{{ item.product[`name${getLocaleName}`] }}</span>
          <span class="font-bold text-lg inline lg:ml-20">{{ item.product.price }} €</span>
        </div>
        <p class="mt-6 lg:mt-3 lg:hidden">
          {{ item.product[`description${getLocaleName}`] }}
        </p>
        <ul class="list-square ml-5 text-base leading-7 mt-2 lg:mt-6 lg:text-md lg:leading-[18px]">
          <li
            v-if="item.frequency"
            class="mb-3"
          >
            {{ item?.frequency ?$t(`boxes.frequency.${item?.frequency}`) : '-' }}
          </li>
          <li class="mb-3">
            {{ item?.boxType ? $t(`string.box.${item?.boxType}`) : '-' }}
          </li>
          <li class="mb-3">
            {{ $t('adminSubscriptionNextDelivery.exclusions') }}: {{ item.exclusions.length }}
          </li>
        </ul>
        <!--        <span class="font-bold text-lg hidden lg:hidden lg:mt-2 lg:text-base">{{ item.product.price }} €</span> -->
      </div>
      <div class="flex flex-row-reverse justify-between px- lg:gap-14">
        <span
          class="mdi mdi-close text-red-primary cursor-pointer"
          @click.prevent="removeItem(item.uuid)"
        />
        <!--          <div class="flex gap-2"> -->
        <!--            <Button -->
        <!--              icon="mdi mdi-minus" -->
        <!--              outlined -->
        <!--              :pt="{ -->
        <!--                root: ['h-4 w-7'], -->
        <!--              }" -->
        <!--              :pt-options="{ -->
        <!--                mergeSections: true, -->
        <!--                mergeProps: true, -->
        <!--              }" -->
        <!--              @click.prevent="decrementQuantity(item)" -->
        <!--            /> -->
        <!--            <span>{{ item.quantity }}</span> -->
        <!--            <Button -->
        <!--              icon="mdi mdi-plus" -->
        <!--              outlined -->
        <!--              :pt="{ -->
        <!--                root: ['h-4 w-7'], -->
        <!--              }" -->
        <!--              :pt-options="{ -->
        <!--                mergeSections: true, -->
        <!--                mergeProps: true, -->
        <!--              }" -->
        <!--              @click.prevent="incrementQuantity(item)" -->
        <!--            /> -->
        <!--          </div> -->
      </div>
      <Divider class="text-grey-secondary" />
    </div>

    <Button
      :label="$t('orderResume.add')"
      outlined
      class="lg: mb-10"
      @click.prevent="handleNewProduct"
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
        :label="$t('order.next')"
        severity="secondary"
        class="mt-4"
        @click.prevent="goToNextStep"
      />
    </div>
    <Toast />
  </div>
</template>
