<template>
  <div
    class="flex justify-evenly flex-row  h-auto mb-20"
  >
    <div
      v-for="box in boxes"
      :key="box.index"
      class="w-1/4 max-w-[400px]"
    >
      <Card class="">
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
          <NuxtLinkLocale
            class="mt-4 lg:mt-0"
            to="order"
          >
            <Button
              class="w-full lg:rounded-t-[0px]"
              label="Comprar"
              severity="secondary"
            />
          </NuxtLinkLocale>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes'

defineProps({
  boxes: {
    type: Array as PropType<CarouselSlideObject[]>,
    required: true,
  },
})
</script>
