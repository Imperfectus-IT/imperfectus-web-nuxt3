<template>
  <Carousel
    :class="carouselClass"
    :wrap-around="wrapItems"
    :items-to-show="visibleItems"
    :autoplay="autoplay"
    :items-to-scroll="numScroll"
    
  >
    <Slide
      v-for="(item, index) in data"
      :key="index"
    >
      <div 
        :class="slideClass"
      >
        <NuxtImg
          v-if="item.image"
          :src="item.image"
          :alt="item.name"
          :class="imageClass"
        />
        <div :class="slotClass">
          <slot
            name="SlideContent"
            :item="item"
            :class="slotClass"
          />
        </div>
      </div>
    </Slide>
    
    <template #addons>
      <Navigation v-if="showNavigation">
        <template #prev>
          <span class="mdi mdi-chevron-left bg-green-tertiary rounded-full  text-green-primary leading-none inline-flex justify-center items-center text-[24px]" />
        </template>
        <template #next>
          <span class="mdi mdi-chevron-right bg-green-tertiary rounded-full  text-green-primary leading-none inline-flex justify-center items-center text-[24px]" />
        </template>
      </Navigation>
      <Pagination v-if="showPagination" />
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import type { CarouselSlideObject } from './TKCarouselTypes';

defineProps({
  data: {
    type: Array as PropType<CarouselSlideObject[]>,
    required: true
  },
    visibleItems: {
        type: Number,
        default: 1
    },
    showNavigation: {
        type: Boolean,
        default: true
    },
    showPagination: {
        type: Boolean,
        default: true
    },
    autoplay: {
        type: Number,
        default: 0
    },
    wrapItems: {
        type: Boolean,
        default: true
    },
    slideClass: {
        type: String,
        default: ''
    },
    carouselClass: {
        type: String,
        default: ''
    },
    imageClass: {
        type: String,
        default: ''
    },
    slotClass: {
        type: String,
        default: ''
    },
    numScroll: {
        type: Number,
        default: 1
    }
})
</script>

<style lang="scss" scoped>
.carousel__pagination {
  height: 0px;
  
  :deep button {
    position: relative;
    bottom: 25px;
    background-color: white;
    margin-left: 6px;
    border-radius: 100%;
    height: 11px;
    width: 11px;
  }

  :deep button::after {
    display: none!important;
  }
}
:deep .carousel__pagination-button.carousel__pagination-button--active {
  background-color: hsl(68 83% 63%)
}
</style>