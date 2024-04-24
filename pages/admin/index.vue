<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

defineI18nRoute({
  paths: {
    es: "/mi-cuenta",
    ca: "/el-meu-compte",
  },
});

const user = useStrapiUser();

// TODO THIS ORDER HAS TO BE WITH STATUS PROCESSING AND DELIVERY DATE > TODAY. IF NOT, THIS SECTION WILL NOT BE DISPLAYED
const order = {
  id: 45765,
  order_id: 4676,
  status: "processing",
  delivery_date: "2024-06-12",
  amount: "23.95",
  sku: "IMR1FR",
  exclusions: ["Caquis", "Berenjena", "Paraguayo"],
};
</script>

<template>
  <Introduction :user="user" />
  <ImagesAndData />
  <NextOrder :order="order" />
  <HandleNextDeliveries />
  <PreferredProducts />
</template>
