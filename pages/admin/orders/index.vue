<template>
  <div class="mx-auto">
    <h4 class="font-recoleta-regular text-[28px]">
      Mis Pedidos
    </h4>
    <OrdersSelector :available-orders="ordersSelectorCountRef" @selected-orders="(payload: string) => filterSelectedOrders(payload)" />
    <div class="flex flex-col">
      <MobileOrder
        v-for="order in ordersToShow"
        v-if="isMobile"
        :key="order.id"
        :order="order"
        class="my-2 "
        :is-collapsed="true"
        :products="[
          ...products.itemProducts.fruits,
          ...products.itemProducts.vegetables,
        ]"
      />
      <DesktopOrder
        v-for="order in ordersToShow"
        v-else
        :key="order.id + 1"
        :order="order"
        class="my-2 "
        :is-collapsed="true"
        :products="[
          ...products.itemProducts.fruits,
          ...products.itemProducts.vegetables,
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

defineI18nRoute({
  paths: {
    es: '/mi-cuenta/pedidos/',
    ca: '/el-meu-compte/comandes/',
  },
})

const { t } = useI18n()
const { orders } = useGetOrdersHandler(t)
const { products } = useGetProductsHandler()
const { isMobile } = useScreenSize();
const ordersToShow = ref([...orders.value])

let ordersSelectorCount = reactive({
  current: 0,
  past: 0,
  total: 0
})

let ordersSelectorCountRef = toRefs(ordersSelectorCount)

watch(orders, (newOrders) => {
  if (newOrders.length > 0) {
    ordersSelectorCount.current = newOrders.filter((order: Order) => dayjs(order.deliveryDate) >= dayjs()).length
    ordersSelectorCount.past = newOrders.filter((order: Order) => dayjs(order.deliveryDate) < dayjs()).length
    ordersSelectorCount.total = newOrders.length
    ordersToShow.value = [...newOrders]
  }
});

const filterSelectedOrders = (payload: string) => {
  if(payload === 'all') {
    return ordersToShow.value = [...orders.value]
  } else if(payload === 'current') {
    return ordersToShow.value = orders.value.filter((order: Order) => dayjs(order.deliveryDate) >= dayjs())
  } else {
    return ordersToShow.value = orders.value.filter((order: Order) => dayjs(order.deliveryDate) < dayjs())
  }
}

</script>
