<script setup lang="ts">
import { IM_PRODUCT_TYPE, S_PRODUCT_TYPE } from '~/composables/shared/products/domain/ProductConstants.ts'

const { shoppingCart } = useShoppingCartState()
const { onSetBoxSize } = useShoppingCartBoxStep()
const emit = defineEmits([GO_TO_STEP_EVENT])
const boxDetails = [
  {
    size: S_PRODUCT_TYPE,
    stepBox: 'order.steps.stepBox.smallBox',
  },
  {
    size: IM_PRODUCT_TYPE,
    stepBox: 'order.steps.stepBox.mediumBox',
  },
  {
    size: XL_PRODUCT_TYPE,
    stepBox: 'order.steps.stepBox.largeBox',
  },
]
// const goToPreviousStep = () => {
//   const previousStep = shoppingCart.value.currentItem.purchaseType === SUBSCRIPTION_TYPE ? FREQUENCY_SUBSCRIPTION_TYPE_STEP : PURCHASE_TYPE_STEP
//   emit(GO_TO_STEP_EVENT, previousStep)
// }
</script>

<template>
  <div class="px-8 md:px-[28%] lg:px-[20%] 2xl:px-[20%]">
    <div class="flex items-center gap-5">
      <div class="lg:absolute lg:left-[35px] flex flex-row gap-3 lg:mt-3">
        <Button
          class="w-[2rem] h-[2rem] text-xl "
          icon="mdi mdi-chevron-left"
          rounded
          outlined
          @click.prevent="$emit(GO_TO_STEP_EVENT, CUSTOMIZE_STEP)"
        />
        <span class="my-auto hidden lg:block">{{ $t('string.back') }}</span>
      </div>
      <p class="font-recoleta-regular text-lg lg:text-2xl lg:mx-auto">
        {{
          $t("order.steps.stepBox.title")
        }}
      </p>
    </div>
    <div class="flex flex-col lg:flex-row items-center gap-5 mt-8">
      <div
        v-for="box in boxDetails"
        :key="box.size"
        class="w-full text-center"
      >
        <Button
          :class="['text-xl w-2/3 lg:w-full', shoppingCart.currentItem.boxSize === box.size ? 'bg-green-primary' : 'bg-transparent']"
          :label="$t(box.stepBox)"
          :icon="shoppingCart.currentItem.boxSize === box.size ? 'mdi mdi-chevron-up' : 'mdi mdi-chevron-down'"
          icon-pos="right"
          outlined
          @click.prevent="onSetBoxSize(box.size)"
        />
      </div>
    </div>
    <ShoppingCartBoxDetail
      v-if="shoppingCart.currentItem.boxSize && shoppingCart.currentItem.product"
      class="mt-5 hidden lg:block"
      :box-product="shoppingCart.currentItem.product"
    />
    <NuxtImg
      v-if="!shoppingCart.currentItem.boxSize"
      alt="static_boxSize"
      src="/images/steps/boxSize/Ipad2_Dark2.webp"
      class="w-[480px] mx-auto hidden lg:block"
    />
    <div class="text-center mt-8">
      <Button
        v-if="shoppingCart.currentItem.boxSize"
        severity="secondary"
        :label="$t('order.steps.stepPurchase.btn-continue')"
        @click.prevent="$emit(GO_TO_STEP_EVENT, PURCHASE_TYPE_STEP)"
      />
    </div>
    <!--    <ShoppingCartPurchaseSummaryFloating -->
    <!--      class="fixed z-10 inset-x-0 bottom-0 w-full lg:hidden" -->
    <!--      :item="shoppingCart.currentItem" -->
    <!--    /> -->
    <!--    <ShoppingCartPurchaseSummaryFloating -->
    <!--      class="hidden fixed z-10 top-[13%] 2xl:top-[10%] right-0 w-1/3 lg:block" -->
    <!--      :item="shoppingCart.currentItem" -->
    <!--    /> -->
  </div>
</template>
