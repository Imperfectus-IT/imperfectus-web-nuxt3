<script setup lang="ts">
const { shoppingCart } = useShoppingCartState()
const { setShoppingCart } = useLocalStorageShoppingCartRepository()
const { fruitsItemProducts, vegetablesItemProducts } = useProductsState()

const setBoxType = (boxSize: string) => shoppingCart.value.currentItem.boxType = boxSize
const { t } = useI18n()
const emit = defineEmits([GO_TO_STEP_EVENT])
const isSelectedBox = (boxType: string) => boxType === shoppingCart.value.currentItem.boxType
const activeButtonSelected = (boxType: string) => isSelectedBox(boxType) ? 'bg-green-primary' : 'bg-transparent'
const boxTypeImages = {
  [MIXED_BOX_TYPE]: {
    src: '/images/boxes/mBox/IM_1.webp',
    alt: t('string.box.mixed'),
  },
  [FRUITS_BOX_TYPE]: {
    src: '/images/boxes/mBox/IMFR_1.webp',
    alt: t('string.box.fruits'),
  },
  [VEGETABLES_BOX_TYPE]: {
    src: '/images/boxes/mBox/IMVG_1.webp',
    alt: t('string.box.vegetables'),
  },
}
const productExclusions = computed(() => {
  return [...vegetablesItemProducts.value, ...fruitsItemProducts.value]
})

const nexStep = () => {
  setShoppingCart(shoppingCart.value)
  emit(GO_TO_STEP_EVENT, BOX_STEP)
}
</script>

<template>
  <div class="px-8 md:px-[28%] lg:px-[25%] 2xl:px-[30%]">
    <div class="flex items-center gap-5">
      <div class="lg:absolute lg:left-[35px] flex flex-row gap-3 lg:mt-3">
        <Button
          class="w-[2rem] h-[2rem] text-xl "
          icon="mdi mdi-chevron-left"
          rounded
          outlined
          @click.prevent="$emit(GO_TO_STEP_EVENT, AVAILABILITY_STEP)"
        />
        <span class="my-auto hidden lg:block">{{ $t('string.back') }}</span>
      </div>
      <p class="font-recoleta-regular text-lg font- lg:text-2xl lg:mx-auto">
        {{
          $t("order.steps.stepCustomize.section1")
        }}
      </p>
    </div>
    <div class="flex flex-col items-center gap-5 mt-8 lg:flex-row">
      <Button
        :class="['text-xl w-2/3', activeButtonSelected(VEGETABLES_BOX_TYPE)]"
        :label="$t('string.box.vegetables')"
        :icon="isSelectedBox(VEGETABLES_BOX_TYPE) ? 'mdi mdi-chevron-up' : 'mdi mdi-chevron-down'"
        icon-pos="right"
        outlined
        @click.prevent="setBoxType(VEGETABLES_BOX_TYPE)"
      />
      <NuxtImg
        v-if="isSelectedBox(VEGETABLES_BOX_TYPE)"
        class="rounded-lg lg:hidden"
        :src="boxTypeImages[shoppingCart.currentItem.boxType].src"
        :alt="boxTypeImages[shoppingCart.currentItem.boxType].alt"
        format="webp"
        preload
      />
      <Button
        :class="['text-xl w-2/3', activeButtonSelected(MIXED_BOX_TYPE)]"
        :label="$t('string.box.mixed')"
        :icon="isSelectedBox(MIXED_BOX_TYPE) ? 'mdi mdi-chevron-up' : 'mdi mdi-chevron-down'"
        icon-pos="right"
        outlined
        @click.prevent="setBoxType(MIXED_BOX_TYPE)"
      />
      <NuxtImg
        v-if="isSelectedBox(MIXED_BOX_TYPE)"
        class="rounded-lg lg:hidden"
        :src="boxTypeImages[shoppingCart.currentItem.boxType].src"
        :alt="boxTypeImages[shoppingCart.currentItem.boxType].alt"
        format="webp"
        preload
      />
      <Button
        :class="['text-xl w-2/3', activeButtonSelected(FRUITS_BOX_TYPE)]"
        :label="$t('string.box.fruits')"
        :icon="isSelectedBox(FRUITS_BOX_TYPE) ? 'mdi mdi-chevron-up' : 'mdi mdi-chevron-down'"
        icon-pos="right"
        outlined
        @click.prevent="setBoxType(FRUITS_BOX_TYPE)"
      />
      <NuxtImg
        v-if="isSelectedBox(FRUITS_BOX_TYPE)"
        class="rounded-lg lg:hidden"
        :src="boxTypeImages[shoppingCart.currentItem.boxType].src"
        :alt="boxTypeImages[shoppingCart.currentItem.boxType].alt"
        format="webp"
        preload
      />
      <NuxtImg
        v-if="isSelectedBox(STONE_FRUITS_BOX_TYPE)"
        class="rounded-lg lg:hidden"
        :src="boxTypeImages[shoppingCart.currentItem.boxType].src"
        :alt="boxTypeImages[shoppingCart.currentItem.boxType].alt"
        format="webp"
        preload
      />
    </div>
    <NuxtImg
      v-if="shoppingCart.currentItem.boxType"
      class="hidden lg:block w-[480px] mx-auto rounded-lg mt-10"
      :src="boxTypeImages[shoppingCart.currentItem.boxType].src"
      :alt="boxTypeImages[shoppingCart.currentItem.boxType].alt"
      format="webp"
      preload
    />
    <ShoppingCartBoxTypeExclusions
      v-if="shoppingCart.currentItem.boxType && shoppingCart.currentItem.boxType !== STONE_FRUITS_BOX_TYPE"
      :product-exclusions="productExclusions"
    />
    <div class="text-center mt-6">
      <Button
        v-if="shoppingCart.currentItem.boxType"
        severity="secondary"
        :label="$t('order.steps.stepPurchase.btn-continue')"
        @click.prevent="nexStep"
      />
    </div>
    <!--    <ShoppingCartPurchaseSummaryFloating -->
    <!--      v-if="shoppingCart.currentItem?.frequency" -->
    <!--      class="fixed z-10 inset-x-0 bottom-0 w-full lg:hidden" -->
    <!--      :item="shoppingCart.currentItem" -->
    <!--    /> -->
    <!--    <ShoppingCartPurchaseSummaryFloating -->
    <!--      v-if="shoppingCart.currentItem?.frequency" -->
    <!--      class="hidden fixed z-10 top-[13%] 2xl:top-[10%] right-0 w-1/3 lg:block" -->
    <!--      :item="shoppingCart.currentItem" -->
    <!--    /> -->
  </div>
</template>
