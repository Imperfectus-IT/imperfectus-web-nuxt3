<template>
  <div
    class="flex flex-row justify-evenly h-auto mb-20"
  >
    <div
      v-for="box in boxes"
      :key="box.index"
      class="w-1/5"
    >
      <Card>
        <template #header>
          <NuxtImg
            class="rounded-t-lg border-b-[1px] border-green-tertiary w-full"
            alt="user header"
            :src="box.image"
            loading="lazy"
            format="webp"
          />
        </template>
        <template #title>
          {{ box.title }}
        </template>
        <template #content>
          <p class="ml-2 lg:text-[14px]">
           {{ box.description }}
          </p>
        </template>
        <template #footer>
          <Button
            class="lg:w-full lg:rounded-t-[0px]"
            label="Comprar"
            severity="secondary"
          />
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes';

defineProps({
  boxes: {
    type: Array as PropType<CarouselSlideObject[]>,
    required: true
  }
});
</script>
