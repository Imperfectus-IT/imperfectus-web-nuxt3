<template>
  <div
    v-if="order"
    class="border-green-tertiary border-[1px] rounded-lg p-4 mt-6 font-solina-extended-book"
  >
    <h4 class="font-recoleta-regular text-[30px]">
      {{ $t("profile.my_account.next_order.title") }}
    </h4>
    <Divider />
    <div class="lg:flex lg:flex-row lg:justify-between lg:items-center"> 
      <div
        class="flex flex-row justify-around lg:justify-start lg:p-4 lg:gap-4 lg:text-[14px]"
      >
        <NuxtImg
          loading="lazy"
          format="webp"
          src="images/boxes/Caixa-S.webp"
          width="110"
          height="100"
          alt="next-order"
          class="rounded-lg h-[100px] my-auto"
        />
        <div>
          <h4 class="font-semibold mb-2 text-[20px]">
            {{ getBoxSize(order.sku) }}
          </h4>
          <ul class="ml-2">
            <ListItem
              main-class="flex gap-x-2"
              dot-class="text-[8px] my-auto text-green-tertiary"
              :text="getBoxFrequency(order.sku)"
            />
            <ListItem
              main-class="flex gap-x-2"
              dot-class="text-[8px] my-auto text-green-tertiary"
              :text="getBoxType(order.sku)"
            />
            <ListItem
              main-class="flex gap-x-2"
              dot-class="text-[8px] my-auto text-green-tertiary"
              :text="
                $t('profile.my_account.next_order.exclusions') +
                order.exclusions.length.toString()
              "
            />
          </ul>
          <p class="font-bold text-[18px] lg:text-[16px]">{{ order.amount }}€</p>
        </div>
      </div>
      <Button
        outlined
        :label="$t('profile.my_account.next_order.open_order')"
        class="ml-3 mt-6 bg-beige-primary lg:mt-0 lg:h-10 mr-4"
        @click="toggleOrderDataDisplayed"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Order } from "../my-orders/types/OrderType";

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
