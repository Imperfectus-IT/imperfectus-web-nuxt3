<template>
  <div class="">
    <p class="my-10 text-left text-[30px] mx-10 lg:w-1/3 lg:ml-32">
      {{ $t('homeBoxes.description') }}
    </p>

    <div class="mb-8 lg:ml-28">
      <div
        class="inline-block ml-4 w-3 h-3 !bg-green-primary rounded-xl mr-1 "
      />
      <Nuxt-link to="boxes">
        {{ $t('homeBoxes.howToWorks') }}
      </Nuxt-link>
    </div>
  </div>

  <LandingBoxesCarousel
    v-if="!displayDesktop"
    :boxes="boxes"
  />
  <LandingBoxesCards
    v-if="displayDesktop"
    :boxes="boxes"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'; 
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const boxes = ref<CarouselSlideObject[]>([
  {
    index: 1,
    image: "/images/landing/boxes-carousel/S.webp",
    name: "S-box",
    title: t('content.home.ourBoxes.item0.title'),
    description: t('content.home.ourBoxes.item0.description')
    
  },
  {
    index: 2,
    image: "/images/landing/boxes-carousel/M.webp",
    name: "M-box",
    title: t('content.home.ourBoxes.item1.title'),
    description: t('content.home.ourBoxes.item1.description')
    
  },
  {
    index: 3,
    image: "/images/landing/boxes-carousel/XL.webp",
    name: "XL-box",
    title: t('content.home.ourBoxes.item2.title'),
    description: t('content.home.ourBoxes.item2.description')
    
  }
]);

const displayDesktop = ref(false);

onMounted(() => {
  if (window.innerWidth > 768) {
    displayDesktop.value = true;
  }
});

</script>


