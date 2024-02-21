<template>
  <div class="lg:grid lg:grid-cols-3 lg:grid-rows-[auto] lg:mt-6">
    <p class="text-[26px] px-4 leading-9 my-12 lg:col-start-2 lg:col-span-2 h-[200px] lg:w-2/3 lg:mb-0">
      {{ $t('homeProducts.description') }}
    </p>
    
    <NuxtImg 
      class="w-11/12 h-[auto] mx-auto lg:col-start-1 lg:row-start-1 lg:row-span-3 lg:w-10/12"
      src="/images/landing/products/Bird_Woman_Dark.png"
      alt="bird_woman_dark"
    />

  <ProductListSelector
@toggle="(data) => {
    classItemsToShow = data
  }"/>
    
  <ProductsCarousel
    :items-to-show="classItemsToShow"
    :display-desktop="displayDesktop"
  />
  </div>
</template>

<script setup lang="ts">
 defineProps({
  displayDesktop: {
    type: Boolean,
    default: false
  },
  }
 )

const classItemsToShow = ref('fruits')

const responsiveProductOptions = ref([
  {
    breakpoint: "1280px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1024px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "768px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "640px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>