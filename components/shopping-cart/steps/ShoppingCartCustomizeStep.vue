<script setup lang="ts">
import {CUSTOMIZE_STEP} from "~/composables/shopping_cart/types/ShoppingCartConstants.ts";
import { MIXED_BOX_TYPE, FRUITS_BOX_TYPE, VEGETABLES_BOX_TYPE } from "~/composables/shared/product/types/ProductConstants.ts";
const { shoppingCart } = useShoppingCartState()
const setBoxType = (boxSize: string) => shoppingCart.value.boxType = boxSize
const { t } = useI18n()
const boxTypeImages = {
  [MIXED_BOX_TYPE]: {
    src: "/images/boxes/Caixa-S.webp",
    alt: t('string.box.mixed'),
  },
  [FRUITS_BOX_TYPE]: {
    src: "/images/boxes/sBox/SFR_1.webp",
    alt: t('string.box.fruits'),
  },
  [VEGETABLES_BOX_TYPE]: {
    src: "/images/boxes/Caixa-XL.webp",
    alt: t('string.box.vegetables'),
  },
}
const exclusions = [
  {
    id: 1,
    name: 'Pepino',
    type: 'item'
  },
  {
    id: 2,
    name: 'Tomate',
    type: 'item'
  },
  {
    id: 3,
    name: 'Cebolla',
    type: 'item'
  },
  {
    id: 4,
    name: 'Manzana',
    type: 'item'
  },
  {
    id: 5,
    name: 'Lechuga',
    type: 'item'
  },
  {
    id: 6,
    name: 'Cereza',
    type: 'item'
  },
  {
    id: 7,
    name: 'Pera',
    type: 'item'
  }
]
</script>

<template>
  <div class="px-10 md:px-[28%] lg:px-[35%] 2xl:px-[40%]">
    <div class="flex items-center gap-3">
      <Button
          class="w-[2rem] h-[2rem] text-xl"
          icon="mdi mdi-chevron-left"
          rounded
          outlined
      />
      <p class="font-recoleta-regular text-lg font-">
        {{
          $t("order.steps.stepCustomize.section1")
        }}
      </p>
    </div>
    <div class="flex flex-col items-center gap-5 mt-8">
      <Button
          class="text-xl w-2/3"
          :label="$t('string.box.vegetables')"
          outlined
          @click.prevent="setBoxType(VEGETABLES_BOX_TYPE)"
      />
      <NuxtImg
          v-if="shoppingCart.boxType === VEGETABLES_BOX_TYPE"
          class="rounded-lg"
          :src="boxTypeImages[shoppingCart.boxType].src"
          :alt="boxTypeImages[shoppingCart.boxType].alt"
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
          v-if="shoppingCart.boxType === MIXED_BOX_TYPE"
          class="rounded-lg"
          :src="boxTypeImages[shoppingCart.boxType].src"
          :alt="boxTypeImages[shoppingCart.boxType].alt"
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
          v-if="shoppingCart.boxType === FRUITS_BOX_TYPE"
          class="rounded-lg"
          :src="boxTypeImages[shoppingCart.boxType].src"
          :alt="boxTypeImages[shoppingCart.boxType].alt"
          format="webp"
          preload
      />

      <ShoppingCartBoxTypeExclusions :productExclusions="exclusions" />
    </div>
    <div class="text-center mt-6">
      <Button
          severity="secondary"
          :label="$t('order.steps.stepPurchase.btn-continue')"
          @click.prevent="$emit('goToStep', CUSTOMIZE_STEP)"
      />
    </div>
  </div>
</template>
