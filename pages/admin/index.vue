<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: t('pages.admin.home.title'),
  meta: [
    {
      name: 'description',
      content: t('pages.admin.home.description'),
    },
  ],
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

defineI18nRoute({
  paths: {
    es: '/mi-cuenta',
    ca: '/el-meu-compte',
  },
})
const { user } = useGetUserHandler()
const lastOrder: Ref<Order> = ref({} as Order)
const isLoading = ref(true)

const { orders } = useGetOrdersHandler(t)

watch(orders, () => {
  getLastOrder()
})

const getLastOrder = () => {
  lastOrder.value = orders.value.filter((order: Order) => {
    return (
      order.deliveryInfo.deliveryDate > dayjs().format('YYYY-MM-DD')
      && order.status === 'processing'
    )
  })[0]
  isLoading.value = false
}
const getSubscriptionId = computed(() => lastOrder.value?.subscription)
</script>

<template>
  <div class="lg:mt-2 xl:w-full">
    <Introduction :user="user" />
    <ImagesAndData kgs="50" />
    <div v-if="isLoading">
      <CardSkeleton />
    </div>
    <div v-else>
      <NextOrder
        v-if="lastOrder"
        :order="lastOrder"
      />
    </div>
    <HandleNextDeliveries
      v-if="getSubscriptionId"
      :subscription-id="getSubscriptionId"
    />
  </div>
</template>
