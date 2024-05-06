<template>
  <div class="lg:min-w-[900px] lg:max-w-[1500px] lg:mx-auto">
    <Panel :header="`Pedido ${order.id}`" >
      <Divider class="mt-2" />

      <div v-for="(orderItem, index) in order.orderItems" :key="index" class="mt-7">
        <OrderItemCard :order-item="orderItem" />
        <OrderProductsCarousel
          v-if="!isCollapsed"
          :products="filteredProducts(orderItem)"
        />
        <OrderEdit
          v-if="!isCollapsed"
          :exclusions="orderItem.exclusions"
          :order-item="orderItem"
        />
      </div>
<!-- //////////// -->
      <div v-if="order.status !== 'cancelled'">
        <NuxtLink v-if="isCollapsed" :to="`/mi-cuenta/pedidos/${order.id}`">
          <Button
            outlined
            label="Detalles del pedido"
            :pt="{
              label: 'text-[14px]',
            }"
            class="mt-8 w-2/3"
          />
        </NuxtLink>
      </div>
<!-- //////////// -->

      <div v-else>
        <div class="bg-red-secondary w-1/2 h-9 rounded-lg flex items-center justify-center text-[12px] mt-6">{{ $t("string.status.order.cancelled") }}</div>
        <p class="mt-3">Fecha de cancelacion: ********</p> <!-- TODO This is not stored in DB --> 
      </div>

      <TKTimeline class="mt-4 " :order-status="order.status" />
      <OrderCoupon v-if="!isCollapsed" />
    </Panel>
<!-- //////////// -->

    <div
      v-if="!isCollapsed"
      class="flex flex-col gap-5 text-green-tertiary lg:grid lg:grid-cols-2 lg:gap-x-5 lg:gap-y-0"
    >
      <OrderBillingPanel
        class="mt-5"
        :data="order.billing"
        :label-key="'orders.order.billing'"
      />
      <OrderDeliveryPanel
        class="mt-5"
        :data="order.deliveryInfo"
        :label-key="'orders.order.order_delivery'"
      />

      <OrderShippingPanel
        class="mt-5"
        :data="order.shippingInfo"
        :label-key="'orders.order.order_shipping'"
        @edit-shipping-info="() => console.log('Edit shipping info')"
      />

      <OrderBillingInfoPanel
        class="mt-5"
        :data="order.billingInfo"
        :label-key="'orders.order.order_billing_info'"
        @edit-billing-info="() => console.log('Edit billing info')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  order: Order;
  isCollapsed: boolean;
  products: ItemProduct[];
}>();

const filteredProducts = (orderItem: OrderItem) => {
  return props.products.filter((product) => {
    return !orderItem.exclusions.includes(product.name) && product.isActive;
  });
};
onMounted(() => {
  console.log(props.products);
});
</script>
