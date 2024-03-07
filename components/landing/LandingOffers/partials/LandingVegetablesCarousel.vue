<template>
  <TKCarousel
    :data="vegetables"
    :show-navigation="showNavigation"
    :autoplay="5000"
    :image-class="'lg:object-cover lg:h-[80vh] lg:w-full'"
    :slide-class="'lg:w-full'"
  />
</template>

<script setup lang="ts">
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes';



defineProps({
  vegetables: {
    type: Array as PropType<CarouselSlideObject[]>,
    required: true
  },
  showNavigation: {
    type: Boolean,
    default: false
  }
});

</script>