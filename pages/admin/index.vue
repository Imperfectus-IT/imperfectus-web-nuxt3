<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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

const user = useStrapiUser()
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
</script>

<template>
  <div class="lg:mt-2 xl:w-full 2xl:px-64">
    <Introduction :user="user" />
    <ImagesAndData kgs="50" />
    <div v-if="isLoading">
      Cargando...
    </div>
    <div v-else>
      <NextOrder
        v-if="lastOrder"
        :order="lastOrder"
      />
    </div>
    <HandleNextDeliveries :subscription-id="1234" />
  </div>
</template>
