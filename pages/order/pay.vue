<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useGetOrderByNotificationHandler } from '~/composables/admin/orders/application/get-by-notification/useGetOrderByNotificationHandler.ts'

const { t } = useI18n()
const localePath = useLocalePath()

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
const orderNotificationHash: string = route.query.notification
const { order } = useGetOrderByNotificationHandler(orderNotificationHash, t)
</script>

<template>
  <Container
    v-if="order"
    class="px-6"
  >
    <h1 class="mt-10 mb-5 text-center font-recoleta-regular text-[40px] text-grey-primary md:mb-10">
      {{ $t("pages.order.pay.title") }}
    </h1>

    <CompletePaymentOrderDetails
      :order-id="order?.order_id"
      :delivery-date="order?.deliveryDate"
      :total="order?.orderPayment.totalAmount"
    />

    <TKTimeline
      :order-status="order?.status"
      class="mt-12"
      layout-type="horizontal"
    />

    <Panel class="mt-12">
      <OrderItemCard
        v-for="(item, index) in order?.orderItems"
        :key="index"
        class="!mt-0"
        :order-item="item"
      />
    </Panel>

    <CompletePaymentActions
      class="mt-16 mb-16"
      :order="order"
    />

    <Divider class="before:border-grey-secondary" />

    <div class="flex justify-between mt-10">
      <DeliveryInfo
        :delivery-date="order?.deliveryDate"
        :shipping="order?.shippingInfo"
      />

      <BillingInfo :data="order?.billingInfo" />
      <PaymentInfo :total="order?.orderPayment.totalAmount" />
    </div>

    <Divider class="before:border-grey-secondary mt-10 mb-16" />

    <NuxtLink
      :to="localePath({ name: 'admin' })"
      class="flex justify-center"
    >
      <Button
        :label="$t('pages.order.pay.goToMyAccount')"
      />
    </NuxtLink>
  </container>
</template>
