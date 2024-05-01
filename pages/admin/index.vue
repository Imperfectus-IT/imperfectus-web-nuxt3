<script setup lang="ts">
import { ref } from "vue";
import { userOrders } from "~/composables/admin/orders/useOrders";
import dayjs from "dayjs";

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
let lastOrder: Order | null = null;
const isLoading = ref(true); 

onBeforeMount(async () => {
  await usePersonalOrders();
  getLastOrder();
});

const getLastOrder = () => {
  lastOrder = userOrders.orders.filter((order: Order) => {
    return order.deliveryInfo.deliveryDate > dayjs().format("YYYY-MM-DD");
  })[0];
  isLoading.value = false; 
};

</script>

<template>
  <div class="lg:mt-2 xl:w-full 2xl:px-64">
    <Introduction :user="user" />
    <ImagesAndData kgs="50" />
    <div v-if="isLoading">Cargando...</div>
    <div v-else>
      <NextOrder v-if="lastOrder" :order="lastOrder" />
    </div>
    <HandleNextDeliveries :subscription-id="1234" />
    <PreferredProducts />
  </div>
</template>
