<template>
  <div class="lg:grid lg:grid-cols-4 lg:grid-rows-layout lg:h-[80vh]">
    <p class="text-[22px] px-4 leading-8 mb-8 mt-10 font-solina-extended-book lg:leading-normal lg:mt-20 lg:col-span-2  lg:text-[35px] lg:w-2/3 lg:ml-10">
      {{ $t('homeOffer.weOfferBoxes') }}
    </p>
    {{ currentWidth }}
    <LandingVegetablesCarousel 
      class="lg:col-start-3 lg:col-span-2 lg:row-start-1 lg:h-24"
      :show-navigation="currentWidth"
      :vegetables="vegetables"
    />
    <LandingOffersList class="lg:row-start-2 lg:col-span-2 lg:-mt-44 lg:flex lg:flex-col lg:justify-center lg:ml-9" />
  </div>
  <LandingOffersBanner />
</template>

<script setup lang="ts">
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes';

defineProps({
  vegetables: {
    type: Array as PropType<CarouselSlideObject[]>,
    required: true
  }
});

const currentWidth = ref<boolean>(false)

onMounted(() => {
  setDeviceType();
});

const setDeviceType = (() => {
  currentWidth.value = window.innerWidth > 768 ? true : false
});





</script>