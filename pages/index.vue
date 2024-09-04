<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-col">
    <LandingHeader/>
    <Divider class="before:border-t-2 before:border-green-primary"/>
    <LazyLandingBoxes :display-desktop="isDesktop"/>
    <LazyLandingVegetablesOffers :vegetables="vegetables"/>
    <LazyLandingProducts :display-desktop="isDesktop"/>
    <LandingUpToDate/>
    <LandingBlog :display-desktop="isDesktop"/>
    <LandingWorldData :display-desktop="isDesktop"/>
    <LandingDonations :display-desktop="isDesktop"/>
    <LazyLandingComments/>
    <LandingHelp/>
  </div>
</template>

<script setup lang="ts">
const {isDesktop} = useScreenSize()

const vegetables = [
  {
    index: 1,
    image: '/images/landing/vegetables-carousel/1-zanahoria.webp',
    name: 'Zanahoria-1',
  },
  {
    index: 2,
    image: '/images/landing/vegetables-carousel/2-berenjena.webp',
    name: 'Berenjena-2',
  },
  {
    index: 3,
    image: '/images/landing/vegetables-carousel/3-tomate.webp',
    name: 'Tomate-3',
  },
  {
    index: 4,
    image: '/images/landing/vegetables-carousel/4-berenjena.webp',
    name: 'Berenjena-4',
  },
  {
    index: 5,
    image: '/images/landing/vegetables-carousel/5-tomate.webp',
    name: 'Tomate-5',
  },
]
</script>
