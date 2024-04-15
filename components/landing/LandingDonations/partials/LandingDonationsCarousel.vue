<template>
  <TKCarousel
    class=""
    :data="data"
    :show-navigation="false"
    :image-class="'w-[350px] h-[500px] mx-auto object-cover'"
  >
    <template #SlideContent="{ item }">
      <div
        class="bg-green-tertiary w-[350px] h-[500px] absolute top-[390px] opacity-75 font-recoleta-regular text-white-primary duration-1000"
       :class="{'-translate-y-[390px] duration-1000 opacity-90': display[item.index], '-translate-y-[-0px] duration-700 opacity-55': !display[item.index]}"
        @click="handleClickToDisplay(item.index)"
      >
        <h4
          class="text-[30px] leading-[42px] pt-2 text-center"
          :style="item.index === 2 ? { 'word-spacing': '100vw' } : ''"
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
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes';

defineProps({
  data: {
    type: Array as PropType<CarouselSlideObject[]>,
    required: true
  }
})

const display: Record<number, boolean> = reactive({
  1: false,
  2: false,
  3: false
});

const handleClickToDisplay = (index: number) => {
  display[index] = !display[index];
}
</script>
