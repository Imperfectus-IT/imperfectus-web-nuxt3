<script setup lang="ts">
import {
  FREQUENCY_SUBSCRIPTION_TYPE_STEP,
} from '~/composables/shopping_cart/types/ShoppingCartConstants.ts'
import { MIXED_BOX_TYPE, FRUITS_BOX_TYPE, VEGETABLES_BOX_TYPE } from '~/composables/shared/product/types/ProductConstants.ts'

const { shoppingCart } = useShoppingCartState()
const setBoxType = (boxSize: string) => shoppingCart.value.currentItem.boxType = boxSize
const { t } = useI18n()
const emit = defineEmits(['goToStep'])
const { isDesktop } = useScreenSize()
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
}

const getImageData = () => {
  const boxType = shoppingCart.value.currentItem.boxType as keyof typeof boxTypeImages
  return boxTypeImages[boxType] || { src: '', alt: '' }
}
const exclusions = [
  {
    id: 1,
    name: 'Pepino',
    type: 'item',
  },
  {
    id: 2,
    name: 'Tomate',
    type: 'item',
  },
  {
    id: 3,
    name: 'Cebolla',
    type: 'item',
  },
  {
    id: 4,
    name: 'Manzana',
    type: 'item',
  },
  {
    id: 5,
    name: 'Lechuga',
    type: 'item',
  },
  {
    id: 6,
    name: 'Cereza',
    type: 'item',
  },
  {
    id: 7,
    name: 'Pera',
    type: 'item',
  },
]
</script>

<template>
  <div class="px-10 md:px-[28%] lg:px-[25%] 2xl:px-[30%]">
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
      <p class="font-recoleta-regular text-lg font- lg:text-2xl lg:mx-auto">
        {{
          $t("order.steps.stepCustomize.section1")
        }}
      </p>
    </div>
    <div class="flex flex-col items-center gap-5 mt-8 lg:flex-row">
      <Button
        class="text-xl w-2/3"
        :label="$t('string.box.vegetables')"
        outlined
        @click.prevent="setBoxType(VEGETABLES_BOX_TYPE)"
      />
      <NuxtImg
        v-if="shoppingCart.currentItem.boxType === VEGETABLES_BOX_TYPE && !isDesktop"
        class="rounded-lg"
        :src="boxTypeImages[shoppingCart.currentItem.boxType].src"
        :alt="boxTypeImages[shoppingCart.currentItem.boxType].alt"
        format="webp"
        preload
      />
      <Button
        class="text-xl w-2/3"
        :label="$t('string.box.mixed')"
        outlined
        @click.prevent="setBoxType(MIXED_BOX_TYPE)"
      />
      <NuxtImg
        v-if="shoppingCart.currentItem.boxType === MIXED_BOX_TYPE && !isDesktop"
        class="rounded-lg"
        :src="boxTypeImages[shoppingCart.currentItem.boxType].src"
        :alt="boxTypeImages[shoppingCart.currentItem.boxType].alt"
        format="webp"
        preload
      />
      <Button
        class="text-xl w-2/3"
        :label="$t('string.box.fruits')"
        outlined
        @click.prevent="setBoxType(FRUITS_BOX_TYPE)"
      />
      <NuxtImg
        v-if="shoppingCart.currentItem.boxType === FRUITS_BOX_TYPE && !isDesktop"
        class="rounded-lg"
        :src="boxTypeImages[shoppingCart.currentItem.boxType].src"
        :alt="boxTypeImages[shoppingCart.currentItem.boxType].alt"
        format="webp"
        preload
      />
    </div>
    <NuxtImg
      alt="box_type"
      :src="getImageData().src"
      loading="lazy"
      format="webp"
      class="hidden lg:block w-[480px] mx-auto rounded-lg mt-10"
    />
    <ShoppingCartBoxTypeExclusions :product-exclusions="exclusions" />
    <div class="text-center mt-6">
      <Button
        severity="secondary"
        :label="$t('order.steps.stepPurchase.btn-continue')"
        @click.prevent="$emit('goToStep', FREQUENCY_SUBSCRIPTION_TYPE_STEP)"
      />
    </div>
    <ShoppingCartPurchaseSummaryFloating
      v-if="shoppingCart.currentItem"
      class="fixed z-10 inset-x-0 bottom-0 w-full lg:hidden bg-beige-primary"
      :item="shoppingCart.currentItem"
    />
    <ShoppingCartPurchaseSummaryFloating
      v-if="shoppingCart.currentItem"
      class="hidden fixed z-10 top-[17%] right-0 w-1/3 lg:block bg-beige-primary"
      :item="shoppingCart.currentItem"
    />
  </div>
</template>
