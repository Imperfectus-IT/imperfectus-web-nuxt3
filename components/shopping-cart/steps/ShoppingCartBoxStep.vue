<script setup lang="ts">
import {CUSTOMIZE_STEP} from "~/composables/shopping_cart/types/ShoppingCartConstants.ts";
const { shoppingCart } = useShoppingCartState()
const setBoxSize = (boxSize: string) => shoppingCart.value.boxSize = boxSize
const boxProductToRender = {
  id: 1,
  name: "Caja pequeña",
  description: "Ideal para 1-2 personas. Contiene entre 6-7 kg de fruta y verdura.",
  price: `19,98€`,
  image: "/images/boxes/Caixa-S.webp",
}
const emit = defineEmits(['goToStep'])
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
          $t("order.steps.stepBox.title")
        }}
      </p>
    </div>
    <div class="flex flex-col items-center gap-5 mt-8">
      <Button
          class="text-xl w-2/3"
          :label="$t('order.steps.stepBox.smallBox')"
          icon="mdi mdi-chevron-down"
          iconPos="right"
          outlined
          @click.prevent="setBoxSize(SMALL_BOX_SIZE)"
      />
      <ShoppingCartBoxDetail
          v-if="shoppingCart.boxSize === SMALL_BOX_SIZE"
          :boxProduct="boxProductToRender"
          :boxSize="shoppingCart.boxSize"
      />
      <Button
          class="text-xl w-2/3"
          :label="$t('order.steps.stepBox.mediumBox')"
          icon="mdi mdi-chevron-down"
          iconPos="right"
          outlined
          @click.prevent="setBoxSize(MEDIUM_BOX_SIZE)"
      />
      <ShoppingCartBoxDetail
          v-if="shoppingCart.boxSize === MEDIUM_BOX_SIZE"
          :boxProduct="boxProductToRender"
          :boxSize="shoppingCart.boxSize"
      />
      <Button
          class="text-xl w-2/3"
          :label="$t('order.steps.stepBox.largeBox')"
          icon="mdi mdi-chevron-down"
          iconPos="right"
          outlined
          @click.prevent="setBoxSize(XLARGE_BOX_SIZE)"
      />
      <ShoppingCartBoxDetail
          v-if="shoppingCart.boxSize === XLARGE_BOX_SIZE"
          :boxProduct="boxProductToRender"
          :boxSize="shoppingCart.boxSize"
      />
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
