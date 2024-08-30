<script setup lang="ts">
const { shoppingCart } = useShoppingCartState()
const { itemProducts } = useLocalStorageProductRepository()
const { makeProductExclusion } = useProductFactory()

const setBoxType = (boxSize: string) => shoppingCart.value.currentItem.boxType = boxSize
const { t, locale } = useI18n()
const emit = defineEmits([GO_TO_STEP_EVENT])
const isSelectedBox = (boxType: string) => boxType === shoppingCart.value.currentItem.boxType
const activeButtonSelected = (boxType: string) => isSelectedBox(boxType) ? 'bg-green-primary' : 'bg-transparent'
const boxTypeImages = {
  [MIXED_BOX_TYPE]: {
    src: '/images/boxes/Caixa-S.webp',
    alt: t('string.box.mixed'),
  },
  [FRUITS_BOX_TYPE]: {
    src: '/images/boxes/sBox/SFR_1.webp',
    alt: t('string.box.fruits'),
  },
  [VEGETABLES_BOX_TYPE]: {
    src: '/images/boxes/Caixa-XL.webp',
    alt: t('string.box.vegetables'),
  },
  [STONE_FRUITS_BOX_TYPE]: {
    src: '/images/boxes/IMStone_sale.webp',
    alt: t('string.box.stone_fruits'),
  },
}
const productExclusions = computed(() => {
  return itemProducts().map(product => makeProductExclusion(product, locale.value))
})

const goToPreviousStep = () => {
  const previousStep = shoppingCart.value.currentItem.purchaseType === SUBSCRIPTION_TYPE ? FREQUENCY_SUBSCRIPTION_TYPE_STEP : PURCHASE_TYPE_STEP
  emit(GO_TO_STEP_EVENT, previousStep)
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
          @click.prevent="goToPreviousStep"
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
      <Button
        :class="['text-xl w-2/3', activeButtonSelected(STONE_FRUITS_BOX_TYPE)]"
        :label="$t('string.box.stone_fruits')"
        outlined
        @click.prevent="setBoxType(STONE_FRUITS_BOX_TYPE)"
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
        @click.prevent="emit(GO_TO_STEP_EVENT, BOX_STEP)"
      />
    </div>
    <ShoppingCartPurchaseSummaryFloating
      v-if="shoppingCart.currentItem?.frequency"
      class="fixed z-10 inset-x-0 bottom-0 w-full lg:hidden"
      :item="shoppingCart.currentItem"
    />
    <ShoppingCartPurchaseSummaryFloating
      v-if="shoppingCart.currentItem?.frequency"
      class="hidden fixed z-10 top-[13%] 2xl:top-[10%] right-0 w-1/3 lg:block"
      :item="shoppingCart.currentItem"
    />
  </div>
</template>
