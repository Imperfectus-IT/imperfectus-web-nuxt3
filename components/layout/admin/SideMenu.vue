<template>
  <div
    class="lg:max-w-[22vw] border-[1px] border-green-ternary flex flex-col font-solina-extended-book text-[20px] p-6 rounded-xl lg:mx-auto lg:mt-10"
  >
    <h4 class="font-recoleta-regular text-[32px] mb-4">
      {{ $t("side_admin_menu.title") }}
    </h4>
    <NuxtLink
      v-for="(item, index) in items"
      :key="index"
      :to="item.link"
      class="pb-1 active:font-bold cursor-pointer flex flex-col"
      >{{ item.label }}</NuxtLink
    >
    <Divider />
    <NuxtLink
      v-for="(item, index) in secondaryItems"
      :key="index"
      :to="item.link"
      class="pb-1 text-[18px] flex flex-col"
      >{{ item.label }}</NuxtLink
    >
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const menuSections = {
  items: 6,
  sub_items: 9,
};


const generateItemsArray = (items: number, index: number = 1) => {
  const data = [];
  for(let i = index; i <= items; i++) {
    data.push({
      label: t(`side_admin_menu.item_${i}.label`),
      link: ''
    })
  }
  return data;
};

const items = generateItemsArray(menuSections.items);
const secondaryItems = generateItemsArray(menuSections.sub_items, menuSections.items + 1);

</script>
