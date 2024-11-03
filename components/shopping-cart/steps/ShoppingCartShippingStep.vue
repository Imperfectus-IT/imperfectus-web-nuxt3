<script setup lang="ts">
import type { z } from 'zod'
import { useGetLocaleLanguage } from '~/composables/shared/useGetLocaleLanguage.ts'
import ShoppingCartTopSummaryBoxSmall from '~/components/shopping-cart/partials/ShoppingCartTopSummaryBoxSmall.vue'
import { createEmpty as createEmptyShoppingCartItem } from '~/composables/shopping-cart/domain/Item.ts'

const { locale } = useI18n()
const { shoppingCart } = useShoppingCartState()
const { setShoppingCart } = useLocalStorageShoppingCartRepository()
const emit = defineEmits([GO_TO_STEP_EVENT])
const shippingFormErrors = ref<z.ZodFormattedError<FormData> | null>(null)
const billingFormErrors = ref<z.ZodFormattedError<FormData> | null>(null)

const isFormValid = computed(() => {
  if (shoppingCart.value.invoiceRequired) {
    return !!shippingFormErrors.value?.errors || !!billingFormErrors.value?.errors
  }
  else {
    return shippingFormErrors.value?.errors
  }
})

const handleNewProduct = () => {
  emit(GO_TO_STEP_EVENT, CUSTOMIZE_STEP)
  shoppingCart.value.currentItem = createEmptyShoppingCartItem()
}

const goToNextStep = () => {
  setShoppingCart(shoppingCart.value)
  emit(GO_TO_STEP_EVENT, DELIVERY_STEP)
}
</script>

<template>
  <div class="px-10">
    <div class="flex items-center justify-center gap-3 mt-3 relative">
      <div class="!absolute left-0 flex flex-row gap-3 lg:mt-4">
        <Button
          class="w-[2rem] h-[2rem] text-xl "
          icon="mdi mdi-chevron-left"
          rounded
          outlined
          @click.prevent="$emit(GO_TO_STEP_EVENT, RESUME_ITEM_STEP)"
        />
        <span class="my-auto hidden lg:block">{{ $t('string.back') }}</span>
      </div>
      <p class="font-recoleta-regular text-xl font-normal text-center w-2/3 lg:hidden">
        {{
          $t(`orderMeta.shippingAddressTitle`)
        }}
      </p>
    </div>
    <div class="flex justify-end lg:hidden">
      <Button
        outlined
        :label="$t('orderMeta.cleanData')"
        :pt="{
          root: 'border-[1px] px-4 py-0.5 rounded-md my-4',
          label: 'text-xs',
        }"
      />
    </div>
    <div class="lg:flex lg:justify-evenly lg:gap-4">
      <div class="lg:w-7/12">
        <div class="lg:border-[1px] lg:rounded-lg lg:w-full lg:p-8 lg:grid lg:grid-cols-2 lg:gap-4 lg:mt-12">
          <ShoppingCartShippingAddress ref="shippingFormErrors" />
        </div>
        <div class="flex items-center lg:mt-4">
          <Checkbox
            v-model="shoppingCart.invoiceRequired"
            :binary="true"
            :pt="{
              box: 'h-4 w-4 border-[1px] rounded-sm my-auto mx-auto text-green-tertiary',
              icon: 'text-green-tertiary',
            }"
          />
          <label
            for="invoiceRequired"
            class="text-xs"
          > {{ $t('orderMeta.isBillingMetaDifferent') }} </label>
        </div>
        <div
          v-if="shoppingCart.invoiceRequired"
          class="lg:border-[1px] lg:rounded-lg lg:w-full lg:p-8 lg:grid lg:grid-cols-2 lg:gap-4 lg:mt-12"
        >
          <ShoppingCartBillingAddress ref="billingFormErrors" />
        </div>
      </div>
      <div class="my-auto hidden lg:block lg:border-[1px] lg:rounded-lg lg:mt-12 lg:p-5 lg:pt-8 lg:w-5/12">
        <ShoppingCartResumeBox
          :display-next-step-button="false"
          @add-new-product="handleNewProduct"
        >
          <template #title>
            <h3 class="font-recoleta-regular text-center lg:text-[36px] font-medium mb-3">
              {{ $t('order.steps.stepResume') }}
            </h3>
          </template>
          <template #boxCard>
            <ShoppingCartTopSummaryBoxSmall />
          </template>
        </ShoppingCartResumeBox>
      </div>
    </div>
    <div class="flex justify-center mt-4 lg:justify-center">
      <Button
        :disabled="isFormValid"
        severity="secondary"
        :label="$t('orderMeta.continue')"
        @click.prevent="goToNextStep"
      />
    </div>
    <ShoppingCartPurchaseSummaryFloating
      class="fixed z-10 inset-x-0 bottom-0 w-full lg:hidden"
      :item="shoppingCart.currentItem"
    />
    <Toast />
  </div>
</template>
