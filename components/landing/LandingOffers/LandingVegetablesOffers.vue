<template>
  <div class="lg:grid lg:grid-cols-4 lg:grid-rows-layout lg:h-[70vh]">
    <p class="text-[22px] px-4 leading-8 mb-8 mt-10 lg:text-[30px] font-solina-condensed-bold lg:leading-normal lg:m-0 lg:col-span-2 lg:mt-auto">
      {{ $t('homeOffer.weOfferBoxes') }}
    </p>
    <LandingVegetablesCarousel 
      class="lg:col-start-3 lg:col-span-2 lg:row-start-1 lg:h-24"
      :vegetables="vegetables"
    />
    <LandingOffersList class="lg:row-start-2 lg:col-span-2 lg:mt-6 lg:flex lg:flex-col lg:justify-center" />
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

</script>