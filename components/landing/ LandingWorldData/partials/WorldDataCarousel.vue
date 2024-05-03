<template>
  <TKCarousel
    :data="data"
    :show-pagination="true"
    :show-navigation="false"
    :slide-class="'h-full'"
  >
    <template #SlideContent="{ item }">
      <div class="flex flex-col items-center w-5/6 mx-auto ">
        <div
          class="border-2 border-green-primary h-52 w-52 rounded-full flex flex-col justify-center m-0 p-0"
          :class="item.index as number % 2 === 0 ? 'bg-green-primary' : 'bg-green-tertiary'"
        >
          <p
            class="font-recoleta-medium text-xl"
            :class="item.index as number % 2 === 0 ? 'text-green-tertiary' : 'text-green-quaternary'"
          >
            {{ item.value }}
          </p>
        </div>
        <div class="bg-green-primary h-10 w-0.5" />
        <div class="bg-green-primary h-3 w-3 rounded-full" />
        <p class="text-lg mt-4 mb-20">
          {{ item['description_' + localeLanguage] }}
        </p>
      </div>
    </template>
  </TKCarousel>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes'

const localeLanguage = computed(() => {
  return useI18n().locale.value
})

defineProps({
  data: {
    type: Array as PropType<CarouselSlideObject[]>,
    required: true,
  },
})
</script>
