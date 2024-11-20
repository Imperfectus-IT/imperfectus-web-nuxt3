<script setup lang="ts">
const { t } = useI18n()

const { shoppingCart } = useGetShoppingCartHandler()
const { handleDiscardShoppingCart } = useDiscardShoppingCartHandler()
const router = useRouter()

const isHasOrderVisible = computed(() => {
  if (!shoppingCart.value || shoppingCart.value.step === AVAILABILITY_STEP) {
    return false
  }

  return ['/nuevo-pedido', '/ca/nova-comanda'].every(path => !router.currentRoute.value.path.includes(path))
})

const discardOrder = () => {
  handleDiscardShoppingCart()
}
</script>

<template>
  <div
    v-if="isHasOrderVisible"
    class="flex items-center justify-center  bg-green-tertiary text-white"
  >
    <span class="text-white-primary">👋 {{ t('hasOrder.message') }}</span>

    <NuxtLinkLocale
      to="order"
    >
      <Button
        class="ml-5 bg-transparent text-green-primary underline"
        size="small"
        variant="text"
      >
        {{ t('hasOrder.next') }}
      </Button>
    </NuxtLinkLocale>

    <Button
      class="ml-8 bg-transparent text-white-primary underline"
      size="small"
      variant="text"
      @click="discardOrder"
    >
      {{ t('hasOrder.discard') }}
    </Button>
  </div>
</template>

<style scoped lang="scss">

</style>
