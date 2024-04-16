<template>
  <div class="mt-14 lg:mt-0 max-w-[1345px] mx-auto">
    <Header
      class="h-[350px]"
      title-class="mb-4"
      description-class="px-3"
      :title="t('boxes.header.title')"
      :description="t('boxes.header.description')"
      background-desktop="/images/boxes/header.webp"
      background-mobile="/images/boxes/header-mobile.webp"
    />

    <div class="mx-3 lg:w-2/3 lg:ml-12">
      <h4
        class="font-solina-extended-medium text-[18px] uppercase font-bold mt-12 mb-4"
      >
        {{ t("content.boxes.title") }}
      </h4>
      <p
        class="text-[25px] leading-8 mb-12 font-solina-extended-medium lg:text-[40px] lg:leading-[45px]"
      >
        {{ t("boxes.our-boxes.description") }}
      </p>
    </div>
    <div class="mx-3">
      <LazyOurBoxesCarousel />
    </div>

    <div class="mx-3 font-solina-extended-medium lg:ml-12">
      <h4 class="font-solina-condensed-bold font-bold text-[18px] mb-8">
        {{ t("boxes.title") }}
      </h4>
      <p class="text-[26px] leading-8 lg:text-[40px] lg:mb-4">
        {{ t("boxes.description.1") }}
      </p>
      <p class="text-[26px] leading-8 mb-8 lg:text-[40px]">
        {{ t("boxes.description.2") }}
      </p>

      <div class="lg:grid lg:grid-cols-4 lg:grid-rows-2">
        <Fieldset
          v-if="isDisplayDesktop"
          class="lg:mb-12 lg:row-start-1 lg:col-span-2"
          :pt="{ legend: 'hidden' }"
        >
          <h4 class="ml-5 font-solina-extended-medium mb-4 font-bold lg:ml-0 lg:mt-6">
            {{ t("boxes.subscription-description.1.title") }}
          </h4>
          <ul>
            <li v-for="(item, index) in subscriptionList" :key="index">
              <ListItem
                main-class="flex gap-x-4"
                dot-class="text-[12px]"
                text-class="-ml-2"
                :text="t(item)"
              />
            </li>
          </ul>
        </Fieldset>

        <template v-else>
          <h4 class="ml-5 font-solina-extended-medium mb-4 font-bold">
            {{ t("boxes.subscription-description.1.title") }}
          </h4>
          <ul>
            <li v-for="(item, index) in subscriptionList" :key="index">
              <ListItem
                main-class="flex gap-x-4"
                dot-class="text-[12px]"
                text-class="-ml-2"
                :text="t(item)"
              />
            </li>
          </ul>
        </template>

        <Fieldset
          v-if="isDisplayDesktop"
          class="lg:row-start-2 lg:col-span-2"
          :pt="{ legend: 'hidden' }"
        >
          <h4 class="mt-12 mb-4 lg:mt-6">
            {{ t("boxes.subscription-description.2.title") }}
          </h4>
          <ul>
            <li v-for="(item, index) in uniqueOrderList" :key="index">
              <ListItem
                main-class="flex gap-x-4"
                dot-class="text-[12px]"
                text-class="-ml-2"
                :text="t(item)"
              />
            </li>
          </ul>
        </Fieldset>

        <template v-else>
          <h4 class="ml-5 font-solina-extended-medium mb-4 font-bold mt-10 lg:mt-0">
            {{ t("boxes.subscription-description.2.title") }}
          </h4>
          <ul>
            <li v-for="(item, index) in uniqueOrderList" :key="index">
              <ListItem
                main-class="flex gap-x-4"
                dot-class="text-[12px]"
                text-class="-ml-2"
                :text="t(item)"
              />
            </li>
          </ul>
        </template>
        <NuxtImg
          class="my-12 lg:col-start-3 lg:col-span-2 lg:row-start-1 lg:row-span-2 lg:my-auto lg:mx-auto"
          src="/images/boxes/shop_dark.webp"
          alt="Shop dark"
          format="webp"
          loading="lazy"
          :width="isDisplayDesktop ? '440' : '375'"
          height="auto"
        />
      </div>
    </div>

    <Divider class="before:border-t-2 before:border-green-primary lg:mt-28 " />

    <p
      class="font-recoleta-regular text-[35px] mx-4 leading-10 lg:w-3/5 lg:mt-16 2xl:ml-0"
    >
      {{ t("homeProducts.description") }}
    </p>

    <div>
      <ProductListSelector class="lg:mt-20" @toggle="handleToggleType" />
      <ProductsCarousel
        class="mt-4"
        :display-desktop="true"
        :items-type="classItemsToShow"
        :visible-items="isDisplayDesktop ? 5 : 1.4"
        :navigation-next-class="'relative lg:left-[96vw] xl:left-[90vw] 2xl:left-[50vw]'"
        :navigation-prev-class="'relative lg:left-[88vw] xl:left-[82vw] 2xl:left-[45vw]'"
        :show-pagination="!isDisplayDesktop"
        :show-navigation="isDisplayDesktop"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineI18nRoute({
  paths: {
    ca: "/les-nostres-caixes/",
    es: "/nuestras-cajas/",
  },
});

const { addResize, removeResize, windowWidth } = useWindowSize();

onMounted(() => {
  addResize();
});

onBeforeUnmount(() => {
  removeResize();
});

const isDisplayDesktop = computed(() => windowWidth.value > 768);
const classItemsToShow = ref("fruits");

const handleToggleType = (type: string) => {
  classItemsToShow.value = type;
};

const subscriptionList = [
  "boxes.subscription-description.1.description.3",
  "boxes.subscription-description.1.description.4",
  "boxes.subscription-description.1.description.5",
  "boxes.subscription-description.1.description.6",
  "boxes.subscription-description.1.description.7",
  "boxes.subscription-description.1.description.8",
  "boxes.subscription-description.1.description.9",
];

const uniqueOrderList = [
  "boxes.subscription-description.2.description.1",
  "boxes.subscription-description.2.description.2.bold",
  "boxes.subscription-description.2.description.3",
  "boxes.subscription-description.2.description.4",
  "boxes.subscription-description.2.description.5",
  "boxes.subscription-description.2.description.6",
];

const fruits = [
  {
    index: 1,
    name: "Fresas",
    image: "/images/landing/products/frutas/fresas.webp",
  },
  {
    index: 2,
    name: "Ciruela",
    image: "/images/landing/products/frutas/ciruela.webp",
  },
  {
    index: 3,
    name: "Kiwi",
    image: "/images/landing/products/frutas/kiwi.webp",
  },
  {
    index: 4,
    name: "Mango",
    image: "/images/landing/products/frutas/mango.webp",
  },
  {
    index: 5,
    name: "Manzana",
    image: "/images/landing/products/frutas/manzana.webp",
  },
  {
    index: 6,
    name: "Naranja",
    image: "/images/landing/products/frutas/naranja.webp",
  },
  {
    index: 7,
    name: "Limón",
    image: "/images/landing/products/frutas/limon.webp",
  },
];

const vegetables = [
  {
    index: 1,
    name: "Acelgas",
    image: "/images/landing/products/verduras/acelgas.webp",
  },
  {
    index: 2,
    name: "Alcachofas",
    image: "/images/landing/products/verduras/alcachofas.webp",
  },
  {
    index: 3,
    name: "Acelgas",
    image: "/images/landing/products/verduras/acelgas.webp",
  },
  {
    index: 4,
    name: "Alcachofas",
    image: "/images/landing/products/verduras/alcachofas.webp",
  },
];
</script>
