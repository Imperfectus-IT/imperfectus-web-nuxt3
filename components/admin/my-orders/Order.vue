<template>
  <div>
    <Panel :header="`Pedido ${order.id}`">
      <Divider class="mt-2" />

      <div v-for="(orderItem, index) in order.orderItems" :key="index">
        <OrderItemCard :order-item="orderItem" />
        <OrderProductsCarousel
          v-if="!isCollapsed"
          :products="filteredProductsByExclusions(orderItem)"
        />
        <OrderEdit
          v-if="!isCollapsed"
          :exclusions="orderItem.exclusions"
          :sku="orderItem.sku"
          :products="products.map((product) => product.name)"
        />
      </div>

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
        <TKTimeline class="mt-4" :order-status="order.status" />
        
      </div>

      <div v-else>
        <div
          class="bg-red-secondary w-1/2 h-9 rounded-lg flex items-center justify-center text-[12px] mt-6"
        >
          {{ $t("string.status.order.cancelled") }}
        </div>
        <!-- TODO This is not stored in DB -->
        <p class="mt-3">Fecha de cancelacion: ********</p>
      </div>
    </Panel>

    <div v-if="!isCollapsed" class="flex flex-col gap-5 text-green-tertiary">
      <OrderBillingPanel
        class="mt-5"
        :data="order.billing"
        :label-key="'orders.order.billing'"
      />
      <OrderDeliveryPanel
        :data="order.deliveryInfo"
        :label-key="'orders.order.order_delivery'"
      />

      <OrderShippingPanel
        :data="order.shippingInfo"
        :label-key="'orders.order.order_shipping'"
        @edit-shipping-info="() => console.log('Edit shipping info')"
      />

      <OrderBillingInfoPanel
        :data="order.billingInfo"
        :label-key="'orders.order.order_billing_info'"
        @edit-billing-info="() => console.log('Edit billing info')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  order: Order;
  isCollapsed: boolean;
}>();

const filteredProductsByExclusions = (orderItem: OrderItem) => {
  return products.filter((product) => {
    return !orderItem.exclusions.includes(product.name);
  })
}

const products = [
  {
    index: 1,
    name: "Fresas",
    image: "/images/landing/products/frutas/fresas.webp",
  },
  {
    index: 2,
    name: "Ciruela",
    image: "/images/landing/products/frutas/ciruela.webp",
  },
  {
    index: 3,
    name: "Kiwi",
    image: "/images/landing/products/frutas/kiwi.webp",
  },
  {
    index: 4,
    name: "Mango",
    image: "/images/landing/products/frutas/mango.webp",
  },
  {
    index: 5,
    name: "Manzana",
    image: "/images/landing/products/frutas/manzana.webp",
  },
  {
    index: 6,
    name: "Naranja",
    image: "/images/landing/products/frutas/naranja.webp",
  },
  {
    index: 7,
    name: "Limón",
    image: "/images/landing/products/frutas/limon.webp",
  },
  {
    index: 1,
    name: "Acelga",
    image: "/images/landing/products/verduras/acelgas.webp",
  },
  {
    index: 2,
    name: "Alcachofa",
    image: "/images/landing/products/verduras/alcachofas.webp",
  },
  {
    index: 3,
    name: "Acelga",
    image: "/images/landing/products/verduras/acelgas.webp",
  },
  {
    index: 4,
    name: "Alcachofa",
    image: "/images/landing/products/verduras/alcachofas.webp",
  },
];
</script>
