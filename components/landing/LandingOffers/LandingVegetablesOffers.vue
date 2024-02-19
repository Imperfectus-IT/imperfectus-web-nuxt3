<template>
  <div>
    <LandingVegetablesCarousel />
    Vegetables
  </div>
</template>

<script setup lang="ts">


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