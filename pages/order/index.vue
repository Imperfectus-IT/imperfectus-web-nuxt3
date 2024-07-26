<script setup lang="ts">
const { t } = useI18n()
const i18nHead = useLocaleHead()

useHead({
  title: t('pages.order.title'),
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: t('pages.order.description'),
    },
    ...i18nHead.value.meta,
  ],
})
defineI18nRoute({
  paths: {
    ca: '/nova-comanda/',
    es: '/nuevo-pedido/',
  },
})
const { shoppingCart } = useShoppingCartState()
const { initShoppingCart } = useShoppingCart()
const { executeStep } = useStep()
const { executeGetAllProducts } = useGetAllStrapiProducts()

const componentToRenderFromStep: Record<string, any> = {
  [AVAILABILITY_STEP]: resolveComponent('LazyShoppingCartAvailabilityStep'),
  [PURCHASE_TYPE_STEP]: resolveComponent('LazyShoppingCartPurchaseTypeStep'),
  [BOX_STEP]: resolveComponent('LazyShoppingCartBoxStep'),
  [FREQUENCY_SUBSCRIPTION_TYPE_STEP]: resolveComponent('LazyShoppingCartFrequencySubscriptionStep'),
  [CUSTOMIZE_STEP]: resolveComponent('LazyShoppingCartCustomizeStep'),
  [AUTH_STEP]: resolveComponent('LazyShoppingCartAuthStep'),
  [RESUME_ITEM_STEP]: resolveComponent('LazyShoppingCartResumeStep'),
  [SHIPPING_STEP]: resolveComponent('LazyShoppingCartShippingStep'),
  [DELIVERY_DATE_STEP]: resolveComponent('LazyShoppingCartDeliveryDateStep'),
  [DELIVERY_STEP]: resolveComponent('LazyShoppingCartDeliveryStep'),
  [PAYMENT_STEP]: resolveComponent('LazyShoppingCartPaymentStep'),
}

const currentProgress = computed(() => {
  const totalSteps = Object.keys(componentToRenderFromStep).length - 1
  const currentStepIndex = Object.keys(componentToRenderFromStep).findIndex(step => step === shoppingCart.value.step)
  return (currentStepIndex / (totalSteps - 1)) * 100
})

onBeforeMount(() => {
  initShoppingCart(shoppingCart)
})
onMounted(async () => {
  console.log('EXECUTE')
  await executeGetAllProducts()
  await executeStep(shoppingCart.value.step)
})
</script>

<template>
  <section>
    <ProgressBar
      class="my-5 w-full"
      :value="currentProgress"
    />
    <component
      :is="componentToRenderFromStep[shoppingCart.step]"
      @go-to-step="executeStep"
    />
  </section>
</template>
