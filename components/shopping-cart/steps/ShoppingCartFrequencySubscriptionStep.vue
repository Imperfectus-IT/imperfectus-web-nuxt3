<script setup lang="ts">
const emit = defineEmits([GO_TO_STEP_EVENT])
const { shoppingCart } = useShoppingCartState()
const { setShoppingCart } = useLocalStorageShoppingCartRepository()
const { activeBoxProducts } = useProductsState()
const { generateSku } = useGenerateSku()
const setFrequency = (frequency: string) => shoppingCart.value.currentItem.frequency = frequency
const isWeeklyFrequency = computed(() => shoppingCart.value.currentItem?.frequency === WEEKLY_FREQUENCY)
const isBiweeklyFrequency = computed(() => shoppingCart.value.currentItem?.frequency === BIWEEKLY_FREQUENCY)
const goBack = () => {
  emit(GO_TO_STEP_EVENT, PURCHASE_TYPE_STEP)
}

const goToNextStep = () => {
  const { boxType, boxSize, frequency } = shoppingCart.value.currentItem
  const newSku = generateSku(boxType, boxSize, frequency)
  shoppingCart.value.currentItem.product = activeBoxProducts.value.find((product: BoxProduct) => product.sku === newSku)
  const currentItem: ShoppingCartItem = shoppingCart.value.currentItem as ShoppingCartItem
  const itemExists = shoppingCart.value.items.some(item => item.uuid === currentItem.uuid)
  if (!itemExists) {
    shoppingCart.value.items.push(currentItem)
  }
  const user = useStrapiUser()
  setShoppingCart(shoppingCart.value)
  emit(GO_TO_STEP_EVENT, user?.value?.id ? RESUME_ITEM_STEP : AUTH_STEP)
}
</script>

<template>
  <div class="px-8 md:px-[28%] lg:px-[20%] 2xl:px-[20%] relative">
    <div class="flex items-center gap-5">
      <div class="lg:absolute lg:left-[35px] flex flex-row gap-5">
        <Button
          class="w-[2rem] h-[2rem] text-xl "
          icon="mdi mdi-chevron-left"
          rounded
          outlined
          @click.prevent="goBack"
        />
        <span class="my-auto hidden lg:block">{{ $t('string.back') }}</span>
      </div>
      <p class="font-recoleta-regular text-lg font-normal text-center w-2/3 lg:text-2xl lg:w-full">
        {{
          $t('order.steps.stepCustomize.frequency')
        }}
      </p>
    </div>
    <div class="flex flex-col items-center gap-5 mt-6 lg:flex-row lg:justify-center">
      <Button
        :class="[isWeeklyFrequency ? 'bg-green-primary' : 'bg-transparent']"
        outlined
        :label="$t('orderItemFrequency.option2')"
        @click.prevent="setFrequency(WEEKLY_FREQUENCY)"
      />
      <Button
        :class="[isBiweeklyFrequency ? 'bg-green-primary' : 'bg-transparent']"
        outlined
        severity="secondary"
        :label="$t('orderItemFrequency.option3')"
        @click.prevent="setFrequency(BIWEEKLY_FREQUENCY)"
      />
    </div>
    <NuxtImg
      src="/images/steps/frequency/frequency.webp"
      format="webp"
      loading="lazy"
      alt="frequency_img"
      class="hidden lg:block mx-auto"
    />
    <div class="flex justify-center mt-5">
      <Button
        v-if="shoppingCart.currentItem?.frequency"
        class="mt-4"
        severity="secondary"
        :label="$t('order.next')"
        @click.prevent="goToNextStep"
      />
    </div>
    <!--    <ShoppingCartPurchaseSummaryFloating -->
    <!--      v-if="shoppingCart.currentItem?.frequency" -->
    <!--      class="hidden fixed z-10 top-[13%] 2xl:top-[10%] right-0 w-1/3 lg:block" -->
    <!--      :item="shoppingCart.currentItem" -->
    <!--    /> -->
  </div>
  <ShoppingCartPurchaseSummaryFloating
    class="fixed z-10 inset-x-0 bottom-0 w-full lg:hidden"
  />
</template>
