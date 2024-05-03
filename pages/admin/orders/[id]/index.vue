<template>
  <Order :is-collapsed="false" :order="order" />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

defineI18nRoute({
  paths: {
    es: "/mi-cuenta/pedidos/[id]",
    ca: "/el-meu-compte/comandes/[id]",
  },
});

const { orders } = useGetOrdersHandler(t);

const route = useRoute();
const orderId = parseInt(route.params.id as string);
const order: Order = orders.value.find(
  (order) => order.id === orderId
) as Order;
</script>
