<template>
<div class="mt-14">
  <Header class="h-[350px]" title-class="mb-4" description-class="px-3" :title="t('boxes.header.title')" :description="t('boxes.header.description')" background-desktop = '/images/boxes/header.webp' background-mobile="/images/boxes/header-mobile.webp" />
  <div class="mx-3">
    <div>
      <h4 class="font-solina-extended-medium text-[18px] uppercase font-bold mt-12 mb-4">{{ t('content.boxes.title') }}</h4>
      <p class="text-[25px] leading-8 mb-12">{{ t("boxes.our-boxes.description") }}</p>
    </div>
    <div>

      <LazyOurBoxesCarousel />
    </div>
  </div>
  <TKCarousel >

  </TKCarousel>
</div>  
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import TKCarousel from "~/components/talkual-ui/TKCarousel/TKCarousel.vue";

const { t } = useI18n();

defineI18nRoute({
    paths: {
        ca: "/les-nostres-caixes/",
        es: "/nuestras-cajas/",
    }
});

const sBoxes = [
    {
        title: "Caja de 6 botellas",
        price: 50,
        description: "Caja de 6 botellas de vino",
        image: ["/images/boxes/box-6.webp"]
    },
    {
        title: "Caja de 12 botellas",
        description: "Caja de 12 botellas de vino",
        image: "/images/boxes/box-12.webp",
        price: 100,
    },
    {
        title: "Caja de 24 botellas",
        description: "Caja de 24 botellas de vino",
        image: "/images/boxes/box-24.webp",
        price: 200,
    },
];

// const { addResize, removeResize, windowWidth } = useWindowSize();

// const width = ref(windowWidth);

// onMounted(() => {
//     addResize();
// });

// onBeforeUnmount(() => {
//     removeResize();
// });

</script>
