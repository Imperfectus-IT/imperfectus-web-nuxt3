<template>

    <div class="flex flex-row gap-4">
      <NuxtImg
        loading="lazy"
        format="webp"
        :src="orderItem.image"
        width="130"
        height="100"
        alt="next-order"
        class="rounded-lg h-[100px] my-auto"
      />
      <div class="text-[15px]">
        <h4 class="font-semibold mb-2">
          {{ getBoxSize(orderItem.sku) }}
        </h4>
        <ul class="ml-2">
          <ListItem
            main-class="flex gap-x-2 mb-1 whitespace-nowrap"
            dot-class="text-[8px] my-auto text-green-tertiary"
            :text="getBoxFrequency(orderItem.sku)"
          />
          <ListItem
            main-class="flex gap-x-2 mb-1"
            dot-class="text-[8px] my-auto text-green-tertiary"
            :text="getBoxType(orderItem.sku)"
          />
          <ListItem
            main-class="flex gap-x-2 mb-1"
            dot-class="text-[8px] my-auto text-green-tertiary"
            :text="
              $t('profile.my_account.next_order.exclusions') +
              ' ' +
              orderItem.exclusions.length
            "
          />
        </ul>
        <p class="font-bold text-[14px] mt-2 lg:text-[16px]">
          {{ orderItem.amount }}€
        </p>
      </div>
    </div>
 
</template>

<script lang="ts" setup>
defineProps<{
  orderItem: OrderItem
}>()

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
