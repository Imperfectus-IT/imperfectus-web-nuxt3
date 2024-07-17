<script setup lang="ts">
import {
  AUTH_STEP,
  AVAILABILITY_STEP, CUSTOMIZE_STEP, PURCHASE_TYPE_STEP, BOX_STEP, FREQUENCY_SUBSCRIPTION_TYPE_STEP, SHIPPING_STEP, DELIVERY_STEP, PAYMENT_STEP,
} from '~/composables/shopping_cart/types/ShoppingCartConstants.ts'

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
  [RESUME_ITEM_STEP]: resolveComponent('LazyShoppingCartResumeStep'),
  [SHIPPING_STEP]: resolveComponent('LazyShoppingCartShippingStep'),
  [DELIVERY_STEP]: resolveComponent('LazyShoppingCartDeliveryStep'),
  [PAYMENT_STEP]: resolveComponent('LazyShoppingCartPaymentStep'),
}

const currentProgress = computed(() => {
  const totalSteps = Object.keys(componentToRenderFromStep).length - 1
  const currentStepIndex = Object.keys(componentToRenderFromStep).findIndex(step => step === shoppingCart.value.step);
  return (currentStepIndex / (totalSteps - 1)) * 100;
})

onMounted(async () => {
  await executeStep(AVAILABILITY_STEP)
})
</script>

<template>
  <section>
    <ProgressBar class="my-5 w-full" :value="currentProgress"/>
    <component
      :is="componentToRenderFromStep[shoppingCart.step]"
      @go-to-step="executeStep"
    />
  </section>
</template>
