<script setup lang="ts">
import { ref } from "vue";

const products = ref([
  {
    index: 5,
    image: "/images/home/1-zanahoria.webp",
    name: "Zanahoria-5",
  },
  {
    id: 6,
    image: "/images/home/2-berenjena.webp",
    name: "Berenjena-6",
  },
  {
    id: 7,
    image: "/images/home/3-tomate.webp",
    name: "Tomate-7",
  },
  {
    id: 8,
    image: "/images/home/4-berenjena.webp",
    name: "Berenjena-8",
  },
]);
const otherProducts = ref([
  {
    index: 1,
    image: "/images/home/1-zanahoria.webp",
    name: "Zanahoria",
  },
  {
    index: 2,
    image: "/images/home/2-berenjena.webp",
    name: "Berenjena",
  },
  {
    index: 3,
    image: "/images/home/3-tomate.webp",
    name: "Tomate",
  },
  {
    index: 4,
    image: "/images/home/4-berenjena.webp",
    name: "Berenjena",
  },
]);

const responsiveProductOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);
const responsiveOtherProductOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>

<template>
  <div class="mb-6 min-h-32">
    <Carousel
      :value="products"
      :num-visible="1"
      :num-scroll="1"
      :show-navigators="false"
      :responsive-options="responsiveProductOptions"
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
      :responsive-options="responsiveOtherProductOptions"
    >
      <template #item="otherProduct">
        <div class="border-1 surface-border border-round m-2 p-3">
          <div class="mb-3">
            <div class="relative mx-auto">
              <img
                :src="otherProduct.data.image"
                :alt="otherProduct.data.name"
                class="w-full border-round"
              >
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>
