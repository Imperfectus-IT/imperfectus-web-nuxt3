<template>
  <div 
    class="flex flex-row justify-evenly"
  >
    <div 
      v-for="item in data"
      :key="item.index"
      class="w-auto relative h-[500px] overflow-hidden"
      @click="handleClickToDisplay(item.index)"
    >
      <NuxtImg
        :src="item.image"
        :alt="item.title"
        class=" h-[500px] w-[400px] object-cover"
      />
      <div
        class="bg-green-tertiary w-auto absolute top-0 h-full text-white "
        :class="{'translate-y-0 duration-1000 opacity-90': display[item.index], '-translate-y-[-390px] duration-700 opacity-55': !display[item.index]}"
      >
        <h4
          class="text-center mt-4 max-w-[400px] font-recoleta-semibold text-[30px] w-11/12 mx-auto hover:cursor-pointer"
          :style="item.index === 2 ? { 'word-spacing': '100vw' } : ''"
        >
          {{ item.title }}
          
        </h4>
        <p
          class="text-lg text-left max-w-[400px] pt-8 px-4 "
        >
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes';

const display: Record<number, boolean> = reactive({
  1: false,
  2: false,
  3: false
});

const handleClickToDisplay = (index: number) => {
  display[index] = !display[index];
}

defineProps({
    data: {
        type: Array as PropType<CarouselSlideObject[]>,
        required: true
    }
})
</script>


 <!-- :class="{'translate-y-0': !isClicked, '-translate-y-[390px]': isClicked}" -->