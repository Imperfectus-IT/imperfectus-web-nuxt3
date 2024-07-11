<script setup lang="ts">
import { SHIPPING_STEP } from '~/composables/shopping_cart/types/ShoppingCartConstants.ts'

const { shoppingCart } = useShoppingCartState()
const emit = defineEmits(['goToStep'])
const goToNextStep = () => {
  const user = useStrapiUser()
  user ? emit('goToStep', SHIPPING_STEP) : emit('goToStep', AUTH_STEP)
}
</script>

<template>
  <div class="px-10 md:px-[28%] lg:px-[25%] 2xl:px-[20%] relative">
    <ShoppingCartSummaryBox :back-button="true" />
    <div class="flex justify-center">
      <Button
        :label="$t('order.next')"
        severity="secondary"
        class="mt-4"
        @click.prevent="goToNextStep"
      />
    </div>
  </div>
</template>
