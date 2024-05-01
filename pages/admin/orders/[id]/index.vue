<template>
    <Order :is-collapsed="false" :order="order" />
</template>

<script setup lang="ts">

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

defineI18nRoute({
    paths: {
        es: "/mi-cuenta/pedidos/[id]",
        ca: "/el-meu-compte/comandes/[id]",
    }
});

import { userOrders } from '~/composables/admin/orders/useOrders';

const route = useRoute();
const orderId = parseInt(route.params.id as string);
const order: Order = userOrders.orders.find((order) => order.id === orderId) as Order;  

</script>