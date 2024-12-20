<template>
  <div class="lg:flex-grow">
    <h4 class="font-recoleta-regular text-[28px]">
      {{ $t('orders.title') }}
    </h4>
    <OrdersSelector
      :available-orders="ordersSelectorCountRef"
      @selected-orders="filterSelectedOrders"
    />
    <div class="flex flex-col">
      <div
        v-if="isMobile"
      >
        <MobileOrder
          v-for="order in ordersToShow"
          :key="order.id"
          :order="order"
          class="my-2 "
          :is-collapsed="true"
          :products="[]"
        />
      </div>
      <DesktopOrder
        v-for="order in ordersToShow"
        v-else
        :key="order.id + 1"
        :order="order"
        class="my-2 "
        :is-collapsed="true"
        :products="[]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import { ref, reactive, toRefs, watch, computed } from 'vue'

const { t } = useI18n()

useHead({
  title: t('pages.admin.orders.title'),
})

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

const { orders } = useGetOrdersHandler(t)

const { isMobile } = useScreenSize()
const ordersToShow = ref([...orders.value])

const ordersSelectorCount = reactive({
  current: 0,
  past: 0,
  total: 0,
})

const ordersSelectorCountRef = toRefs(ordersSelectorCount)

watch(orders, (newOrders) => {
  if (newOrders.length > 0) {
    ordersSelectorCount.current = newOrders.filter((order: Order) => dayjs(order.deliveryDate) >= dayjs()).length
    ordersSelectorCount.past = newOrders.filter((order: Order) => dayjs(order.deliveryDate) < dayjs()).length
    ordersSelectorCount.total = newOrders.length
    ordersToShow.value = [...newOrders]
  }
})

const allOrders = computed(() => orders.value)
const currentOrders = computed(() => orders.value.filter((order: Order) => dayjs(order.deliveryDate) >= dayjs()))
const pastOrders = computed(() => orders.value.filter((order: Order) => dayjs(order.deliveryDate) < dayjs()))

const filterStrategies: { [key: string]: ComputedRef<Order[]> } = {
  all: allOrders,
  current: currentOrders,
  past: pastOrders,
}

const filterSelectedOrders = (payload: string) => {
  const filterFunction = filterStrategies[payload]
  if (filterFunction) {
    ordersToShow.value = filterFunction.value
  }
  else {
    console.error(`Unknown filter type: ${payload}`)
    ordersToShow.value = allOrders.value
  }
}
</script>
