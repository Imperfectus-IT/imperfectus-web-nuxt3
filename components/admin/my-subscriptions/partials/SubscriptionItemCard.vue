<template>
  <div>
    <p class="text-[14px] my-3">Próxima entrega: {{ nextDeliveryDate }}</p>
    <div class="flex flex-row gap-4 mt-2">
      <NuxtImg
        loading="lazy"
        format="webp"
        :src="subscriptionItem.image"
        alt="next-order"
        class="rounded-lg h-[100px] my-auto !w-[130px]"
      />
      <div class="text-[14px] w-1/2 flex flex-col justify-center">
        <h4 class="font-semibold mb-2">
          {{ getBoxSize(subscriptionItem.sku) }}
        </h4>
        <ul v-if="subscriptionStatus === 'active'" class="ml-[3px]">
          <ListItem
            main-class="flex gap-x-2 mb-1 whitespace-nowrap"
            dot-class="text-[8px] -mt-[1px] text-green-tertiary"
            :text="getBoxType(subscriptionItem.sku)"
          />
          <ListItem
            main-class="flex gap-x-2 mb-1 whitespace-nowrap"
            dot-class="text-[8px] -mt-[1px] text-green-tertiary"
            :text="'Entrega: ' + $t(`string.day.${preferredDay}`)"
          />
          <ListItem
            main-class="flex gap-x-2 mb-1 font-bold"
            dot-class="text-[8px] -mt-[1px] text-green-tertiary"
            :text="
              $t('profile.my_account.next_order.exclusions') +
              ' ' +
              subscriptionItem.exclusions.length
            "
          />
        </ul>
        <p class="font-bold">{{ subscriptionItem.amount }} €</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DayMapping } from "../types/DayMapping";

defineProps<{
  subscriptionItem: SubscriptionItem;
  preferredDay: keyof DayMapping;
  subscriptionStatus: string;
  nextDeliveryDate: string;
}>();

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
    : "Fruta y verdura";
};
</script>
