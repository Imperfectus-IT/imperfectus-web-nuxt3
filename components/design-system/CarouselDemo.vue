<script setup lang="ts">
import { computed, ref } from "vue";

const items = [
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
]

const products = computed(() => [
  {
    id: 5,
    image: '/images/home/1-zanahoria.webp',
    name: 'Zanahoria',
  },
  {
    id: 6,
    image: '/images/home/2-berenjena.webp',
    name: 'Berenjena',
  },
  {
    id: 7,
    image: '/images/home/3-tomate.webp',
    name: 'Tomate',
  },
  {
    id: 8,
    image: '/images/home/4-berenjena.webp',
    name: 'Berenjena',
  }
]);
const otherProducts = computed(() => items);

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);
</script>

<template>
  <div class="mb-6 min-h-32">
    <Carousel
      :value="products"
      :num-visible="1"
      :num-scroll="1"
      :show-navigators="false"
      :responsive-options="responsiveOptions"
    >
      <template #item="slotProps">
        <NuxtImg
          :src="slotProps.data.image"
          :alt="slotProps.data.name"
        />
      </template>
    </Carousel>
    <Carousel
      :value="otherProducts"
      :num-visible="2"
      :num-scroll="1"
    >
      <template #item="slotProps">
        <div class="border-1 surface-border border-round m-2  p-3">
          <div class="mb-3">
            <div class="relative mx-auto">
              <img
                :src="slotProps.data.image"
                :alt="slotProps.data.name"
                class="w-full border-round"
              >
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>