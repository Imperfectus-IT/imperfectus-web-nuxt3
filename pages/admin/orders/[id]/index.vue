<template>
  <div v-if="!order">
    Loading...
  </div>
  <div v-else>
    <MobileOrder
      v-if="order && isMobile"
      :is-collapsed="false"
      :order="order"
      :products="[
        ...products.itemProducts.fruits,
        ...products.itemProducts.vegetables,
      ]"
    />
    <DesktopOrder
      v-else
      :is-collapsed="false"
      :order="order"
      :products="[
        ...products.itemProducts.fruits,
        ...products.itemProducts.vegetables,
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { isDesktop, isMobile } = useScreenSize()

const { orders } = useGetOrdersHandler(t)
const { products } = useGetProductsHandler()

const order: Ref<Order | null> = ref(null)
const route = useRoute()
const orderId = parseInt(route.params.id as string)

watch(orders, () => {
  order.value = orders.value.find(order => order?.id === orderId) as Order
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

defineI18nRoute({
  paths: {
    es: '/mi-cuenta/pedidos/[id]',
    ca: '/el-meu-compte/comandes/[id]',
  },
})
</script>
