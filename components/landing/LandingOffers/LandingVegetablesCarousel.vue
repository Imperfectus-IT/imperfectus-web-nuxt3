<template>
  <div>
    <p class="text-[22px] px-4 leading-8 mb-8 mt-10">
      {{ $t('homeOffer.weOfferBoxes') }}
    </p>
    <TKCarousel
      :data="vegetables"
      :show-navigation="false"
      :autoplay="5000"
    />
  </div>
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