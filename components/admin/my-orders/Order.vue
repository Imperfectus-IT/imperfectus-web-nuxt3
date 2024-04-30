<template>
  <div>
    <Panel :header="`Pedido ${order.id}`">
      <Divider class="mt-2" />
      <div class="flex flex-row gap-4">
        <NuxtImg
          loading="lazy"
          format="webp"
          :src="`images/boxes/Caixa-${getBoxImage(order.sku)}.webp`"
          width="130"
          height="100"
          alt="next-order"
          class="rounded-lg h-[100px] my-auto"
        />
        <div class="text-[15px]">
          <h4 class="font-semibold mb-2">{{ getBoxSize(order.sku) }}</h4>
          <ul class="ml-2">
            <ListItem
              main-class="flex gap-x-2 mb-1 whitespace-nowrap"
              dot-class="text-[8px] my-auto text-green-tertiary"
              :text="getBoxFrequency(order.sku)"
            />
            <ListItem
              main-class="flex gap-x-2 mb-1"
              dot-class="text-[8px] my-auto text-green-tertiary"
              :text="getBoxType(order.sku)"
            />
            <ListItem
              main-class="flex gap-x-2 mb-1"
              dot-class="text-[8px] my-auto text-green-tertiary"
              :text="$t('profile.my_account.next_order.exclusions') + ' ' + order.exclusions.length"
            />
          </ul>
          <p class="font-bold text-[14px] mt-2 lg:text-[16px]">
            {{ order.amount }}€
          </p>
        </div>
      </div>
      <div v-if="order.status !== 'cancelled'">
        <Button
          outlined
          label="Detalles del pedido"
          :pt="{
            label: 'text-[14px]',
          }"
          class="mt-8 w-2/3"
        />
        <TKTimeline
          v-if="order.status !== 'cancelled'"
          class="mt-4"
          :order-status="order.status"
        />
      </div>
      <div v-else>
        <div class="bg-red-secondary w-1/2 h-9 rounded-lg flex items-center justify-center text-[12px] mt-6">
          {{ $t("string.status.order.cancelled") }}
        </div>
        <p class="mt-3">Fecha de cancelacion: ********</p>
      </div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import type { Order } from "~/composables/admin/orders/OrderType";

defineProps<{
  order: Order;
}>();

const getBoxImage = (sku: string) => {
  console.log(sku);
  return sku.includes("IM") ? "M" : sku.includes("XL") ? "XL" : "S";
};

const getBoxSize = (sku: string) => {
  return sku.includes("IM")
    ? "Caja mediana"
    : sku.includes("XL")
      ? "Caja grande"
      : "Caja pequeña";
};

const getBoxType = (sku: string) => {
  return sku.includes("FR")
    ? "Fruta"
    : sku.includes("VG")
      ? "Verdura"
      : sku.includes("Orange")
        ? "Naranjas"
        : "Verdura y fruta";
};

const getBoxFrequency = (sku: string) => {
  return sku.includes("1") ? "Cada semana" : "Cada 2 semanas";
};
</script>
