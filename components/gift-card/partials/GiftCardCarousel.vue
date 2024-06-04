<template>
  <TKCarousel
    :data="cardsData"
    :image-class="'w-[284px] h-[190px]'"
    :show-pagination="!isDesktop"
    :show-navigation="isDesktop"
    :visible-items="!isDesktop ? 1.1 : 4"
    :navigation-next-class="'absolute text-[40px] left-12'"
    :navigation-prev-class="'absolute text-[40px] right-12'"
  />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n();
const language = computed(() => locale.value);
const { isDesktop } = useScreenSize();

const section = t("gift-card.create.images");
const cards = 6;

const cardsData = ref<{ image: string }[]>([]);

onMounted(() => {
  cardsData.value = Array.from({ length: cards }, (_, i) => ({
    image: `${section}${language.value}/${i + 1}.webp`,
  }));
});
</script>
