<template>
  <div class="min-w-[900px] max-w-[1100px] 2xl:max-w-[1400px] ">
    <Panel :header="`Pedido ${order.id}`" :style="{ minHeight: isOneStepOrder }" :class="`p-2 relative `">
      <Divider class="mt-2 lg:!w-1/2" />
      <div class="flex flex-row justify-between flex-wrap -mt-6">
        <div
          v-for="(orderItem, index) in order.orderItems"
          :key="index"
          class="mt-7 w-2/3"
        >
          <div class="flex flex-col relative">
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
        </div>
       <div :style="{ minHeight: isOneStepOrder }" :class="` absolute right-0 w-1/3 `">
         <TKTimeline class=" absolute -mt-10 left-0 " :order-status="order.status" />
       </div>
       <div
         v-if="order.status !== 'cancelled'"
         class="lg: lg:bottom-3 lg:w-full"
       >
         <NuxtLink v-if="isCollapsed" :to="`/mi-cuenta/pedidos/${order.id}`">
           <Button
             outlined
             label="Detalles del pedido"
             :pt="{
               label: 'text-[14px]',
             }"
             class="mt-8 w-2/3 lg:w-1/3"
           />
         </NuxtLink>
       </div>
 
       <div v-else>
         <div
           class="bg-red-secondary w-1/2 h-9 rounded-lg flex items-center justify-center text-[12px] mt-6"
         >
           {{ $t("string.status.order.cancelled") }}
         </div>
         <p class="mt-3">Fecha de cancelacion: **********</p>
         <!-- TODO This is not stored in DB -->
       </div>
      </div>
      

      <OrderCoupon v-if="!isCollapsed" />
    </Panel>

    <div
      v-if="!isCollapsed"
      class="text-green-tertiary grid grid-cols-2 gap-x-5 gap-y-0"
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

const isOneStepOrder = computed(() => {
  const oneStepStatuses = ['refunded', 'cancelled', 'failed', 'replaced']
  return oneStepStatuses.includes(props.order.status) ? '150px' : '420px'
})
</script>
