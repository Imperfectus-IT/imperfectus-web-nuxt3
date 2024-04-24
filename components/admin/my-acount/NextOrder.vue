<template>
  <div
    v-if="order"
    class="border-green-tertiary border-[1px] rounded-lg p-4 mt-6 font-solina-extended-book m-6"
  >
    <h4 class="font-recoleta-regular text-[30px]">
      {{ $t("profile.my_acount.next_order.title") }}
    </h4>
    <Divider />
    <div class="flex flex-row justify-around">
      <NuxtImg
        loading="lazy"
        format="webp"
        src="images/boxes/sBox/S_1.webp"
        width="110"
        height="100"
        alt=""
        class="rounded-lg object-cover h-[100px] my-auto"
      />
      <div>
        <h4 class="font-semibold mb-2 text-[20px]">
          {{ getBoxSize(order.sku) }}
        </h4>
        <ul class="ml-2">
          <ListItem
            main-class="flex gap-x-2"
            dot-class="text-[10px] mt-1"
            :text="getBoxFrequency(order.sku)"
          />
          <ListItem
            main-class="flex gap-x-2"
            dot-class="text-[10px] mt-1"
            :text="getBoxType(order.sku)"
          />
          <ListItem
            main-class="flex gap-x-2"
            dot-class="text-[10px] mt-1"
            :text="
              $t('profile.my_acount.next_order.exclusions') +
              order.exclusions.length.toString()
            "
          />
        </ul>
        <p>{{ order.amount }}€</p>
      </div>
    </div>
    <Button
      outlined
      :label="$t('profile.my_acount.next_order.open_order')"
      class="ml-3 mt-6 bg-beige-primary"
      @click="toggleOrderDataDisplayed"
    />
  </div>
</template>
<script setup lang="ts">
import type { Order } from "./types/Order";

defineProps<{
  order: Order;
}>();

const isOrderDataDisplayed = ref<boolean>(false);

const toggleOrderDataDisplayed = () => {
  isOrderDataDisplayed.value = !isOrderDataDisplayed.value;
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
