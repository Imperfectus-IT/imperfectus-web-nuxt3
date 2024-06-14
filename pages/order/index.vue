<script setup lang="ts">
import {
  AUTH_STEP,
  AVAILABILITY_STEP, CUSTOMIZE_STEP, PURCHASE_TYPE_STEP, BOX_STEP, FREQUENCY_SUBSCRIPTION_TYPE_STEP
} from '~/composables/shopping_cart/types/ShoppingCartConstants.ts'

definePageMeta({
  layout: 'default',
  middleware: ['guest'],
})
defineI18nRoute({
  paths: {
    ca: '/nova-comanda/',
    es: '/nuevo-pedido/',
  },
})
const { shoppingCart } = useShoppingCartState()
const { executeStep } = useStep()

const componentToRenderFromStep: Record<string, any> = {
  [AVAILABILITY_STEP]: resolveComponent('LazyShoppingCartAvailabilityStep'),
  [PURCHASE_TYPE_STEP]: resolveComponent('LazyShoppingCartPurchaseTypeStep'),
  [BOX_STEP]: resolveComponent('LazyShoppingCartBoxStep'),
  [FREQUENCY_SUBSCRIPTION_TYPE_STEP]: resolveComponent('LazyShoppingCartFrequencySubscriptionStep'),
  [CUSTOMIZE_STEP]: resolveComponent('LazyShoppingCartCustomizeStep'),
  [AUTH_STEP]: resolveComponent('LazyShoppingCartAuthStep'),
}

onMounted(async () => {
  await executeStep(AVAILABILITY_STEP)
})
</script>

<template>
  <section>
    <component :is="componentToRenderFromStep[shoppingCart.step]" @goToStep="executeStep" />
  </section>
</template>
