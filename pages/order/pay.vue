<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useGetOrderHandler } from '~/composables/admin/orders/getOne/useGetOrderHandler.ts'

const { t } = useI18n()

useHead({
  title: t('pages.order.pay.title'),
  meta: [
    {
      name: 'description',
      content: t('pages.order.pay.description'),
    },
  ],
})

definePageMeta({
  layout: 'default',
  middleware: ['auth'],
})

// defineI18nRoute({
//   paths: {
//     es: '/order/pay?order=[order]',
//     ca: '/el-meu-compte/subscripcions/properes-entregues/[id]',
//   },
// })

const route = useRoute()

const order_id: number = Number(route.query.order)

const { order } = useGetOrderHandler(order_id, t)
</script>

<template>
  <Container
    v-if="order"
    class="px-6"
  >
    <h1 class="mb-5 text-center font-recoleta-regular text-[40px] text-grey-primary md:mb-10">
      {{ $t("pages.order.pay.title") }}
    </h1>

    <CompletePaymentOrderInfo
      :order-id="order.order_id"
      :delivery-date="order.deliveryDate"
      :total="order.orderPayment.totalAmount"
    />

    <TKTimeline
      :order-status="order.status"
      class="mt-12"
      layout-type="horizontal"
    />

    <Panel class="mt-10">
      <OrderItemCard
        v-for="(item, index) in order?.orderItems"
        :key="index"
        class="!mt-0"
        :order-item="item"
      />
    </Panel>

    <CompletePaymentActions class="mt-10" />
  </Container>
</template>

<style scoped lang="scss"></style>
