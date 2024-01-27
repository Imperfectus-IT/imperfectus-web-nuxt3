<script setup lang="ts">
import { computed, ref } from "vue";


const products = computed(() => [
  {
    id: 1,
    image: '1-zanahoria.webp',
    name: 'Zanahoria',
  },
  {
    id: 2,
    image: '2-berenjena.webp',
    name: 'Berenjena',
  },
  {
    id: 3,
    image: '3-tomate.webp',
    name: 'Tomate',
  },
  {
    id: 4,
    image: '4-brenjena.webp',
    name: 'Brenjena',
  }
]);
const productItems = ref([
  {
    id: 1,
    image: 'https://res.cloudinary.com/talkual/image/upload/f_auto/v1668508919/small_Pruna_6ca01d4dda.png',
    name: 'Ciruela'
  },
  {
    id: 2,
    image: 'https://res.cloudinary.com/talkual/image/upload/f_auto/v1668508856/small_maduixes_edb0086bbe.png',
    name: 'Fresas'
  },
  {
    id: 3,
    image: 'https://res.cloudinary.com/talkual/image/upload/f_auto/v1668508919/small_Pruna_6ca01d4dda.png',
    name: 'Ciruela'
  },
  {
    id: 4,
    image: 'https://res.cloudinary.com/talkual/image/upload/f_auto/v1668508856/small_maduixes_edb0086bbe.png',
    name: 'Fresas'
  },
  {
    id: 5,
    image: 'https://res.cloudinary.com/talkual/image/upload/f_auto/v1668508919/small_Pruna_6ca01d4dda.png',
    name: 'Ciruela'
  },
  {
    id: 6,
    image: 'https://res.cloudinary.com/talkual/image/upload/f_auto/v1668508856/small_maduixes_edb0086bbe.png',
    name: 'Fresas'
  },
  {
    id: 7,
    image: 'https://res.cloudinary.com/talkual/image/upload/f_auto/v1668508919/small_Pruna_6ca01d4dda.png',
    name: 'Ciruela'
  },
  {
    id: 8,
    image: 'https://res.cloudinary.com/talkual/image/upload/f_auto/v1668508856/small_maduixes_edb0086bbe.png',
    name: 'Fresas'
  },
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
  <Carousel
    :value="productItems"
    :num-visible="3"
    :num-scroll="1"
    :responsive-options="responsiveOptions"
  >
    <template #item="product">
      <img
        :src="product.data.image"
        :alt="product.data.name"
        width="160"
      >
    </template>
  </Carousel>
</template>

<!--<template>
  <Carousel
    :value="products"
    :num-visible="3"
    :num-scroll="1"
    :responsive-options="responsiveOptions"
  >
    <template #item="slotProps">
      <img
        :src="'~/assets/images/products/' + slotProps.data.image"
        :alt="slotProps.data.name"
        class="w-full border-round"
      >
    </template>
  </Carousel>
</template> -->