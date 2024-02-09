<template>
  <div>
    <Carousel
      :value="vegetables"
      :num-visible="1"
      :num-scroll="1"
      :show-navigators="false"
      :show-indicators="true"
      :autoplay-interval="5000"
      :responsive-options="responsiveProductOptions"
    >
      <template #item="slotProps">
        <NuxtImg
          :src="slotProps.data.image"
          :alt="slotProps.data.name"
        />
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">    
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
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);       

const vegetables = ref([
  {
    index: 1,
    image: "/images/landing/vegetables-carousel/1-zanahoria.webp",
    name: "Zanahoria-1",
  },
  {
    index: 2,
    image: "/images/landing/vegetables-carousel/2-berenjena.webp",
    name: "Berenjena-2",
  },
  {
    index: 3,
    image: "/images/landing/vegetables-carousel/3-tomate.webp",
    name: "Tomate-3",
  },
  {
    index: 4,
    image: "/images/landing/vegetables-carousel/4-berenjena.webp",
    name: "Berenjena-4",
  },
  {
    index: 5,
    image: "/images/landing/vegetables-carousel/5-tomate.webp",
    name: "Tomate-5",
  }
]);
</script>