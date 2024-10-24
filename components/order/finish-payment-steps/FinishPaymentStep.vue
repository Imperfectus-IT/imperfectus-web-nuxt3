<script setup lang="ts">
defineProps<{
  order: Order
}>()
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
      :order-id="order.order_id"
      :delivery-date="order.deliveryDate"
      :total="order.orderPayment.totalAmount"
    />

    <TKTimeline
      :order-status="order.status"
      class="mt-12"
      layout-type="horizontal"
    />

    <Panel class="mt-12">
      <div class="flex flex-col gap-5">
        <OrderItemCard
          v-for="(item, index) in order?.orderItems"
          :key="index"
          class="!mt-0"
          :order-item="item"
        />
      </div>
    </Panel>

    <CompletePaymentActions
      class="mt-16 mb-16"
      :order="order"
    />

    <Divider class="before:border-grey-secondary" />

    <div class="flex justify-around mt-10">
      <DeliveryInfo
        :delivery-date="order.deliveryDate"
        :shipping="order.shippingInfo"
      />

      <BillingInfo :data="order.billingInfo" />
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

<style scoped lang="scss">

</style>
