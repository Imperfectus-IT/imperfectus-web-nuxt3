<template>
  <div class="flex flex-row justify-evenly lg:w-11/12 lg:mx-auto">
    
    <div
      v-for="item in data"
      :key="item.index"
      class="w-1/4 mx-2"
    >
      <div class="h-[300px] flex flex-col justify-center items-center">
        <div 
          class=" flex flex-col justify-center items-center text-center rounded-full border-2 border-green-primary mx-auto"
          :class="[
            item.index % 2 === 0 ? 'bg-green-primary' : 'bg-green-tertiary',
            item.index === 1 ? 'h-44 w-44' : 
            item.index === 2 ? 'h-40 w-40' :
            item.index === 3 ? 'h-32 w-32' :
            'h-60 w-60']"
        >
          <p 
            class="font-recoleta-medium text-[26px]"
            :class="item.index % 2 !== 0 ? 'text-green-primary' : 'text-green-tertiary'"
          >
            {{ item.value }}
          </p>
        </div>
        <div 
          class="w-0.5 h-1 bg-green-primary absolute " 
          :class="item.index === 1 ? 'top-[438px] h-14' :
            item.index === 2 ? 'top-[430px] h-16' :
            item.index === 3 ? 'top-[412px] h-20' :
            'top-[470px] h-5'"
        />
        <div class="w-2 h-2 rounded-full absolute top-[490px] bg-green-primary" />
      </div>
      <div>
        <p class="text-center mt-2 text-[20px] w-10/12 mx-auto">
          {{ item['description_' + localeLanguage] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes';
import { useI18n } from 'vue-i18n';

defineProps({
  data: {
    type: Array as PropType<CarouselSlideObject[]>,
    required: true
  }
});

const localeLanguage = computed(() => {
  return useI18n().locale.value;
})
</script>
