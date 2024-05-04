<template>
  <div class="2xl:px-">
    <h4 class="font-recoleta-regular text-[28px]">Mis Pedidos</h4>
    <div class="flex flex-col">
      <Order
        v-for="order in orders"
        :key="order.id"
        :order="order"
        class="my-2 "
        :is-collapsed="true"
        :products="[
          ...products.itemProducts.fruits,
          ...products.itemProducts.vegetables,
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const { orders } = useGetOrdersHandler(t);
const { products } = useGetProductsHandler();

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
