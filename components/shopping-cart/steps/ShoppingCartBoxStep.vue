<script setup lang="ts">
import { CUSTOMIZE_STEP } from '~/composables/shopping_cart/types/ShoppingCartConstants.ts'
import type { BoxProductDetail } from '~/components/shopping-cart/ShoppingCartBoxDetail.vue'

const { shoppingCart } = useShoppingCartState()
const { isDesktop } = useScreenSize()
const setBoxSize = (boxSize: string) => shoppingCart.value.boxSize = boxSize
const boxProductToRender = [
  {
    id: 1,
    name: 'Caja pequeña',
    key: 'small',
    description: 'Ideal para 1-2 personas. Contiene entre 6-7 kg de fruta y verdura.',
    price: `19,98€`,
    image: '/images/boxes/Caixa-S.webp',
  },
  {
    id: 2,
    name: 'Caja mediana',
    key: 'medium',
    description: 'Ideal para 1-2 personas. Contiene entre 6-7 kg de fruta y verdura.',
    price: `19,98€`,
    image: '/images/boxes/Caixa-M.webp',
  },
  {
    id: 3,
    key: 'xlarge',
    name: 'Caja grande',
    description: 'Ideal para 1-2 personas. Contiene entre 6-7 kg de fruta y verdura.',
    price: `19,98€`,
    image: '/images/boxes/Caixa-XL.webp',
  },
]
const emit = defineEmits(['goToStep'])
const getProductToRender = (key: string): BoxProductDetail => {
  return boxProductToRender.find((product: BoxProductDetail) => product.key === key) as BoxProductDetail
}
</script>

<template>
  <div class="px-10 md:px-[28%] lg:px-[25%] 2xl:px-[20%]">
    <div class="flex items-center gap-3">
      <div class="lg:absolute lg:left-5 flex flex-row gap-3 lg:mt-3">
        <Button
          class="w-[2rem] h-[2rem] text-xl "
          icon="mdi mdi-chevron-left"
          rounded
          outlined
        />
        <span class="my-auto hidden lg:block">Volver</span>
      </div>
      <p class="font-recoleta-regular text-lg lg:text-2xl lg:mx-auto">
        {{
          $t("order.steps.stepBox.title")
        }}
      </p>
    </div>
    <div class="flex flex-col lg:flex-row items-center gap-5 mt-8">
      <Button
        class="text-xl w-2/3"
        :label="$t('order.steps.stepBox.smallBox')"
        icon="mdi mdi-chevron-down"
        icon-pos="right"
        outlined
        @click.prevent="setBoxSize(SMALL_BOX_SIZE)"
      />
      <ShoppingCartBoxDetail
        v-if="shoppingCart.boxSize === SMALL_BOX_SIZE && !isDesktop"
        :box-product="getProductToRender(shoppingCart.boxSize)"
        :box-size="shoppingCart.boxSize"
      />
      <Button
        class="text-xl w-2/3"
        :label="$t('order.steps.stepBox.mediumBox')"
        icon="mdi mdi-chevron-down"
        icon-pos="right"
        outlined
        @click.prevent="setBoxSize(MEDIUM_BOX_SIZE)"
      />
      <ShoppingCartBoxDetail
        v-if="shoppingCart.boxSize === MEDIUM_BOX_SIZE && !isDesktop"
        :box-product="getProductToRender(shoppingCart.boxSize)"
        :box-size="shoppingCart.boxSize"
      />
      <Button
        class="text-xl w-2/3"
        :label="$t('order.steps.stepBox.largeBox')"
        icon="mdi mdi-chevron-down"
        icon-pos="right"
        outlined
        @click.prevent="setBoxSize(XLARGE_BOX_SIZE)"
      />
      <ShoppingCartBoxDetail
        v-if="shoppingCart.boxSize === XLARGE_BOX_SIZE && !isDesktop"
        :box-product="getProductToRender(shoppingCart.boxSize)"
        :box-size="shoppingCart.boxSize"
      />
    </div>
    <NuxtImg
      v-if="isDesktop && !shoppingCart.boxSize"
      alt="static_boxSize"
      src="/images/steps/boxSize/Ipad2_Dark2.webp"
      class="w-[480px] mx-auto"
    />
    <ShoppingCartBoxDetail
      v-if="shoppingCart.boxSize && isDesktop"
      :box-product="getProductToRender(shoppingCart.boxSize)"
      :box-size="shoppingCart.boxSize"
    />
    <div class="text-center mt-6">
      <Button
        severity="secondary"
        :label="$t('order.steps.stepPurchase.btn-continue')"
        @click.prevent="$emit('goToStep', CUSTOMIZE_STEP)"
      />
    </div>
  </div>
</template>
