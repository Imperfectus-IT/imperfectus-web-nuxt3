<template>
  <Carousel
    class=""
    :wrap-around="true"
    :items-to-show="1"
    :autoplay="autoplay"
  >
    <Slide
      v-for="(item, index) in boxes"
      :key="index"
    >
      <div>
        <NuxtImg
          :src="item.image"
          :alt="item.name"
          :class="['lg:w-[50vw] h-full rounded-lg', optionalSlideClass]"
          loading="lazy"
          format="webp"
        />
        <slot name="SlideContent" />
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
import { ref } from 'vue';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import type { CarouselSlideObject } from '../talkual-ui/TKCarousel/TKCarouselTypes';

defineProps({
  data: {
    type: Array as PropType<CarouselSlideObject[]>,
    default: () => []
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
    optionalSlideClass: {
        type: String,
        default: ''
    }
})

const boxes = ref<CarouselSlideObject[]>([
  {
    index: 1,
    image: "/images/landing/boxes-carousel/S.webp",
    name: "S-box",
  },
  {
    index: 2,
    image: "/images/landing/boxes-carousel/M.webp",
    name: "M-box",
  },
  {
    index: 3,
    image: "/images/landing/boxes-carousel/XL.webp",
    name: "XL-box",
  },
  {
    index: 4,
    image: "/images/landing/boxes-carousel/S.webp",
    name: "S-box",
  },
  {
    index: 5,
    image: "/images/landing/boxes-carousel/M.webp",
    name: "M-box",
  },
  {
    index: 6,
    image: "/images/landing/boxes-carousel/XL.webp",
    name: "XL-box",
  }
]);

const responsiveProductOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);
const responsiveOtherProductOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);
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
