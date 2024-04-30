<template>
  <h4 class="font-recoleta-regular text-[28px]">Mis Pedidos</h4>
  <div class="flex flex-col">
    <Order v-for="order in orders" :key="order.id" :order="order" class="my-2"/>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const orders = ref<Order[]>([]);

onMounted(async () => {
  const personalOrders = await usePersonalOrders();
  orders.value = personalOrders;
});
</script>
