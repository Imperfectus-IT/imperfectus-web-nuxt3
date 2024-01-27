<script setup lang="ts">
import { computed, ref } from "vue";

const products = computed(() => [
  {
    id: 1,
    image: '/images/home/1-zanahoria.webp',
    name: 'Zanahoria',
  },
  {
    id: 2,
    image: '/images/home/2-berenjena.webp',
    name: 'Berenjena',
  },
  {
    id: 3,
    image: '/images/home/3-tomate.webp',
    name: 'Tomate',
  },
  {
    id: 4,
    image: '/images/home/4-berenjena.webp',
    name: 'Berenjena',
  }
]);

const responsiveOptions = ref([
  {
    breakpoint: '1536px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1280px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '768px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '640px',
    numVisible: 1,
    numScroll: 1
  }
]);
</script>

<template>
  <div class="mb-6 min-h-32">
    <Carousel :value="products" :num-visible="1" :num-scroll="1" :showNavigators="false"
      :responsive-options="responsiveOptions">
      <template #item="slotProps">
        <NuxtImg :src="slotProps.data.image" :alt="slotProps.data.name" />
      </template>
    </Carousel>
    <Carousel :value="products" :num-visible="2" :num-scroll="1" :showIndicators="false"
      :responsive-options="responsiveOptions">
      <template #item="slotProps">
        <NuxtImg :src="slotProps.data.image" :alt="slotProps.data.name" class="w-[200px] h-[200px]" />
      </template>
    </Carousel>
  </div>
</template>