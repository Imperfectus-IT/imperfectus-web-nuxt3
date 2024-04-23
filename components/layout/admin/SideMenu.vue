<template>
  <div
    class="w-[22vw] border-[1px] border-green-ternary flex flex-col font-solina-extended-book text-[20px] p-6 rounded-xl ml-16 mt-10"
  >
    <h4 class="font-recoleta-regular text-[32px] mb-4">
      {{ $t("side_menu.title") }}
    </h4>
    <NuxtLink
      v-for="(item, index) in items"
      :key="index"
      :to="item.link"
      class="pb-1 active:text-green-primary cursor-pointer"
      >{{ item.label }}</NuxtLink
    >
    <Divider />
    <NuxtLink
      v-for="(item, index) in secondaryItems"
      :key="index"
      :to="item.link"
      class="pb-1"
      >{{ item.label }}</NuxtLink
    >
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const menuSections = {
  items: 6,
  sub_items: 3,
};


const generateItemsArray = (items: number) => {
  const data = [];
  for(let i = 0; i < items; i++) {
    data.push({
      label: t(`side_menu.item_${i + 1}.label`),
      link: ''
    })
  }
  return data;
};

const items = generateItemsArray(menuSections.items)
const secondaryItems = generateItemsArray(menuSections.sub_items)


// const items = [
//   {
//     label: t("side_menu.item_1.label"),
//     link: "",
//   },
//   {
//     label: t("side_menu.item_2.label"),
//     link: "",
//   },
//   {
//     label: t("side_menu.item_3.label"),
//     link: "",
//   },
//   {
//     label: t("side_menu.item_4.label"),
//     link: "",
//   },
//   {
//     label: t("side_menu.item_5.label"),
//     link: "",
//   },
//   {
//     label: t("side_menu.item_6.label"),
//     link: "",
//   },
// ];

// const secondaryItems = [
//     {
//     label: t("side_menu.item_7.label"),
//     link: "",
//   },
//   {
//     label: t("side_menu.item_8.label"),
//     link: "",
//   },
//   {
//     label: t("side_menu.item_9.label"),
//     link: "",
//   },
// ]
</script>
