<template>
  <div v-for="(item, index) in orderItems" :key="index" class="mt-8">
    <div class="flex flex-row gap-4">
      <NuxtImg
        loading="lazy"
        format="webp"
        :src="`images/boxes/Caixa-${getBoxImage(item.sku)}.webp`"
        width="130"
        height="100"
        alt="next-order"
        class="rounded-lg h-[100px] my-auto"
      />
      <div class="text-[15px]">
        <h4 class="font-semibold mb-2">{{ getBoxSize(item.sku) }}</h4>
        <ul class="ml-2">
          <ListItem
            main-class="flex gap-x-2 mb-1 whitespace-nowrap"
            dot-class="text-[8px] my-auto text-green-tertiary"
            :text="getBoxFrequency(item.sku)"
          />
          <ListItem
            main-class="flex gap-x-2 mb-1"
            dot-class="text-[8px] my-auto text-green-tertiary"
            :text="getBoxType(item.sku)"
          />
          <ListItem
            main-class="flex gap-x-2 mb-1"
            dot-class="text-[8px] my-auto text-green-tertiary"
            :text="
              $t('profile.my_account.next_order.exclusions') +
              ' ' +
              item.exclusions.length
            "
          />
        </ul>
        <p class="font-bold text-[14px] mt-2 lg:text-[16px]">{{item.amount}}€</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  orderItems: OrderItem[];
}>();

const getBoxImage = (sku: string) => {
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
