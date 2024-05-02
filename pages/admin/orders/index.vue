<template>
  <h4 class="font-recoleta-regular text-[28px]">Mis Pedidos</h4>
  <div class="flex flex-col">
    <Order
      v-for="order in userOrders.orders"
      :key="order.id"
      :order="order"
      class="my-2"
      :is-collapsed="true"
    />
  </div>
</template>

<script setup lang="ts">

onMounted(async () => {
  await usePersonalOrders();
});

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

defineI18nRoute({
  paths: {
    es: "/mi-cuenta/pedidos/",
    ca: "/el-meu-compte/comandes/",
  },
});
</script>
