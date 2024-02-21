<template>
  <TKCarousel 
    class=""
    :data="data" 
    :show-navigation="false"
    :image-class="'w-[350px] h-[500px] mx-auto object-cover'"
  >
    <template #SlideContent="{ item }">
      <div 
        class="bg-green-tertiary w-[350px] h-[500px] absolute top-[390px] opacity-75 font-recoleta-regular text-white duration-1000"
        :class="{'translate-y-0': !isClicked, '-translate-y-[390px]': isClicked}"
        @click="isClicked = !isClicked"
      >
        <h4
          class="text-[30px] leading-[42px] pt-6 text-center"
        >
          {{ item.title }}
        </h4>
        <p
          class="text-lg text-left pl-6 pt-6"
        >
          {{ item.description }}
        </p>
      </div>
    </template>
  </TKCarousel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes';

defineProps({
  data: {
    type: Array as PropType<CarouselSlideObject[]>,
    required: true
  }
})

const isClicked = ref(false);
</script>