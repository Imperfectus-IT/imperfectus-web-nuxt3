<template>
  <div v-if="!order">
    <CardSkeleton />
  </div>
  <div
    v-else
    class="flex flex-grow"
  >
    <MobileOrder
      v-if="order && isMobile"
      :is-collapsed="false"
      :order="order"
      :products="[]"
      @review-created="handleReviewCreated"
    />
    <DesktopOrder

      v-else
      :is-collapsed="false"
      :order="order"
      :products="[]"
      @review-created="handleReviewCreated"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t } = useI18n()
useHead({
  title: t('pages.admin.order.title', { order: route.params.id }),
})

const { isMobile } = useScreenSize()

const { orders, executeGetOrdersByUser } = useGetOrdersHandler(t)

const order: Ref<Order | null> = ref(null)
const orderId = parseInt(route.params.id as string)

watch(orders, () => {
  order.value = orders.value.find(order => order?.id === orderId) as Order
})

const handleReviewCreated = () => {
  executeGetOrdersByUser()
}

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
