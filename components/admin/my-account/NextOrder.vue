<template>
  <div
    class="border-green-tertiary border-[1px] rounded-lg p-4 mt-6 font-solina-extended-book"
  >
    <h4 class="font-recoleta-regular text-[30px]">
      {{ $t("profile.my_account.next_order.title") }}
    </h4>
    <Divider />
    <OrderItemCard :order-items="order.orderItems" />
    <NuxtLink :to="`/mi-cuenta/pedidos/${order.id}`">
      <Button
        outlined
        :label="$t('profile.my_account.next_order.open_order')"
        class="ml-3 mt-6 bg-beige-primary lg:mt-0 lg:h-10 mr-4"
      />
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import { userOrders } from "~/composables/admin/orders/useOrders";
import dayjs from "dayjs";

let lastOrder: Order[];

defineProps<{
  order: Order;
}>();

// const isOrderDataDisplayed = ref<boolean>(false);

// const getBoxSize = (sku: string) => {
//   return sku.includes("IM")
//     ? "Caja mediana"
//     : sku.includes("XL")
//       ? "Caja grande"
//       : "Caja pequeña";
// };

// const getBoxType = (sku: string) => {
//   return sku.includes("FR")
//     ? "Fruta"
//     : sku.includes("VG")
//       ? "Verdura"
//       : sku.includes("Orange")
//         ? "Naranjas"
//         : "Verdura y fruta";
// };

// const getBoxFrequency = (sku: string) => {
//   return sku.includes("1") ? "Cada semana" : "Cada 2 semanas";
// };
</script>
