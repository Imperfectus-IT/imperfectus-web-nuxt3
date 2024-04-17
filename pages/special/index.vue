<template>
  <Header
    class="h-[350px] mt-12"
    :title="t('layout.navbar.boxes.special')"
    background-desktop="/images/special/oranges/orange_header.webp"
    background-mobile="/images/special/oranges/orange_header.webp"
  />

  <div class="max-w-[1345px] mx-auto">
    <div class="">
      <h4 class="font-solina-extended-book mt-8 mx-3 text-[26px] leading-8 lg:text-[35px] lg:leading-10 whitespace-break-spaces">
      {{ t("boxes.our-boxes.oranges-box.description.1") }}
    </h4>
    <p class="px-3 font-solina-condensed-bold font-bold text-[18px] my-5">
      {{ t("boxes.our-boxes.oranges-box.title") }}
    </p>
    </div>

    <CarouselAndCard
      class="mx-3 lg:mx-1"
      :box-options="orangeBoxOptions"
      :carousel-data="getImagesForCarousel()"
      :card-data="getCardData"
      :selected-box="boxSelected.orange"
      card-order="1"
      carousel-order="2"
      @update-item-on-parent="
        (payload: SelectedOrangeBox) => updateSelectedBox(payload)
      "
    />

    <TKCarousel
      :data="orangeImages"
      slide-class="w-11/12 h-[auto] lg:mx-auto"
      image-class="rounded-[10px] xl:w-[230px] xl:h-[200px] object-cover"
      :show-navigation="false"
      :show-pagination="!displayDesktop"
      :items-to-show="displayDesktop ? 5 : 1"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { OrangeBoxImages } from "./types/OrangeBoxImages";
import type { SelectedOrangeBox } from "./types/OrangeBoxSelected";
const { t } = useI18n();

defineI18nRoute({
  paths: {
    ca: "/caixes-estacionals/",
    es: "/cajas-estacionales/",
  },
});

const { addResize, removeResize, windowWidth } = useWindowSize();
onMounted(() => {
  addResize();
});

onBeforeUnmount(() => {
  removeResize();
});

const displayDesktop = computed(() => windowWidth.value > 768);

const orangeBoxData = {
  s: {
    title: t("content.home.ourBoxes.item0.title"),
    description: t("boxes.our-boxes.oranges-box.description.2"),
    price: "18.00€",
  },
  im: {
    title: t("content.home.ourBoxes.item1.title"),
    description: t("boxes.our-boxes.oranges-box.description.2"),
    price: "22.00€",
  },
  xl: {
    title: t("content.home.ourBoxes.item2.title"),
    description: t("boxes.our-boxes.oranges-box.description.2"),
    price: "30.00€",
  },
};

const boxSelected = reactive({
  orange: {
    content: "IM",
    frequency: "weekly",
    units: 1,
  },
});

const getCardData = computed(() => {
  if (boxSelected.orange.content === "S") {
    return orangeBoxData.s;
  } else if (boxSelected.orange.content === "IM") {
    return orangeBoxData.im;
  } else {
    return orangeBoxData.xl;
  }
});

const getImagesForCarousel = () => {
  return orangeBoxesImages[
    boxSelected.orange.content.toLowerCase() as keyof OrangeBoxImages
  ];
};

const updateSelectedBox = (payload: SelectedOrangeBox) => {
  Object.assign(boxSelected.orange, payload);
};

const orangeBoxOptions = [
  {
    name: t("orderItemSize.small"),
    value: "S",
  },
  {
    name: t("orderItemSize.medium"),
    value: "IM",
  },
  {
    name: t("orderItemSize.large"),
    value: "XL",
  },
];

const orangeBoxesImages: OrangeBoxImages = {
  s: [
    {
      image: "/images/special/oranges/boxes/S-Orange.webp",
      title: "Orange Box S",
    },
  ],
  im: [
    {
      image: "/images/special/oranges/boxes/IM-Orange.webp",
      title: "Orange Box M",
    },
  ],
  xl: [
    {
      image: "/images/special/oranges/boxes/XL-Orange.webp",
      title: "Orange Box L",
    },
  ],
};

const orangeImages = [
  {
    image: "/images/special/oranges/oranges-1.webp",
    title: "Orange 1",
  },
  {
    image: "/images/special/oranges/oranges-2.webp",
    title: "Orange 2",
  },
  {
    image: "/images/special/oranges/oranges-3.webp",
    title: "Orange 3",
  },
];
</script>
