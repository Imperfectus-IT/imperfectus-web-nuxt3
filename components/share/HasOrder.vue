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
    class="bg-green-tertiary"
  >
    <div class="flex items-center justify-center py-2  flex-col md:gap-0 md:flex-row">
      <span class="text-green-quaternary">👋 {{ t('hasOrder.message') }}</span>

      <div>
        <NuxtLinkLocale
          to="order"
        >
          <Button
            class="ml-5 bg-transparent text-green-primary underline"
            size="small"
            variant="text"
            :pt="{
              root: {
                class: 'text-[16px] font-bold',
              },
            }"
          >
            {{ t('hasOrder.next') }}
          </Button>
        </NuxtLinkLocale>

        <Button
          class="ml-4 bg-transparent text-green-quaternary underline"
          size="small"
          variant="text"
          :pt="{
            root: {
              class: 'text-[16px]',
            },
          }"
          @click="discardOrder"
        >
          {{ t('hasOrder.discard') }}
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
