<script setup lang="ts">
import { CUSTOMIZE_STEP } from '~/composables/shopping_cart/types/ShoppingCartConstants.ts'

const { shoppingCart } = useShoppingCartState()
const { onSetBoxSize } = useShoppingCartBoxStep()
defineEmits(['goToStep'])
const boxDetails = [
  {
    size: SMALL_BOX_SIZE,
    stepBox: 'order.steps.stepBox.smallBox',
  },
  {
    size: MEDIUM_BOX_SIZE,
    stepBox: 'order.steps.stepBox.mediumBox',
  },
  {
    size: XLARGE_BOX_SIZE,
    stepBox: 'order.steps.stepBox.largeBox',
  },
]
</script>

<template>
  <div class="px-10 md:px-[28%] lg:px-[20%] 2xl:px-[20%]">
    <div class="flex items-center gap-3">
      <div class="lg:absolute lg:left-5 flex flex-row gap-3 lg:mt-3">
        <Button
          class="w-[2rem] h-[2rem] text-xl "
          icon="mdi mdi-chevron-left"
          rounded
          outlined
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
          class="text-xl w-2/3 lg:w-full"
          :label="$t(box.stepBox)"
          icon="mdi mdi-chevron-down"
          icon-pos="right"
          outlined
          @click.prevent="onSetBoxSize(box.size)"
        />

        <ShoppingCartBoxDetail
          v-if="shoppingCart.currentItem.boxSize === box.size && shoppingCart.currentItem.boxProduct"
          class="mt-5 lg:hidden"
          :box-product="shoppingCart.currentItem.boxProduct"
        />
      </div>
    </div>
    <ShoppingCartBoxDetail
        v-if="shoppingCart.currentItem.boxSize && shoppingCart.currentItem.boxProduct"
        class="mt-5 hidden lg:block"
        :box-product="shoppingCart.currentItem.boxProduct"
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
        @click.prevent="$emit('goToStep', CUSTOMIZE_STEP)"
      />
    </div>
    <ShoppingCartPurchaseSummaryFloating
      class="fixed z-10 inset-x-0 bottom-0 w-full lg:hidden bg-beige-primary"
      :item="shoppingCart.currentItem"
    />
    <ShoppingCartPurchaseSummaryFloating
      class="hidden fixed z-10 top-[17%] right-0 w-1/3 lg:block bg-beige-primary"
      :item="shoppingCart.currentItem"
    />
  </div>
</template>
