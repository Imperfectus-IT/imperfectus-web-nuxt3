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
</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineI18nRoute({
    paths: {
        ca: "/les-nostres-caixes/",
        es: "/nuestras-cajas/",
    }
});
</script>
