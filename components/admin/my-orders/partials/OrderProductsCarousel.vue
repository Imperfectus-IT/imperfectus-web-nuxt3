<template>
  <div class="mb-12">
    <h4 class="!font-bold text-[14px] mt-4">
      ¿Qué lleva tu pedido?
    </h4>
    <Divider class="mt-2 !w-2/3" />
    <TKCarousel
      :data="products"
      :visible-items="5"
      :show-pagination="true"
      :show-navigation="false"
      image-class="w-[50px] h-[50px] object-cover"
      slide-class="w-[1/2] "
      pagination-class="-bottom-9 bg-red-primary"
    >
      <template #SlideContent="{ item }">
        <p class="text-[10px]">
          {{ item.name }}
        </p>
      </template>
    </TKCarousel>
  </div>
</template>

<script setup lang='ts'>
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes'

defineProps<{
  products: CarouselSlideObject[]
}>()
</script>
