<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

definePageMeta({
  layout: 'default',
  middleware: ['auth'],
})

const { t } = useI18n()
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
      :total="30.72"
    />

    <p class="mt-5 mb-5">
      {{ $t('pages.order.pay.orderContents') }}
    </p>

    <Panel>
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
