<template>
  <div>
    <p class="text-[26px] mx-4 leading-9 px-2 my-12">
      {{ $t('homeProducts.description') }}
    </p>
    
    <NuxtImg 
      class="w-11/12 h-[auto] mx-auto"
      src="/images/landing/products/Bird_Woman_Dark.png"
      alt="bird_woman_dark"
    />

    <div class="font-recoleta text-[26px] mt-16 mb-6 ml-4">
      <ul class="flex">
        <div class="flex items-center mr-4">
          <div 
            v-if="classItemsToShow === 'fruits'"
            class="w-3 h-3 bg-green-primary rounded-xl mr-2"
          />
          <li
            :class="classItemsToShow === 'fruits' ? '' : 'text-grey-primary'"
            @click="classItemsToShow = 'fruits'"
          >
            Fruta
          </li>
        </div>
        <div class="flex items-center">
          <div
            v-if="classItemsToShow === 'vegetables'"
            class="w-3 h-3 bg-green-primary rounded-xl mr-2"
          />
          <li
            :class="classItemsToShow === 'vegetables' ? '' : 'text-grey-primary'"
            @click="classItemsToShow = 'vegetables'"
          >
            Verduras
          </li>
        </div>
      </ul>
    </div>
    
    <TKCarousel
      :data="classItemsToShow === 'fruits' ? fruits : vegetables"
      :visible-items="1.4"
      :show-pagination="false"
      :show-navigation="false"
      :wrap-items="true"
      :image-class="'py-4 relative bottom-2 h-[32vh] w-[55vw] mx-auto'"
      :slide-class="'bg-beige-secondary  rounded-[20px] w-[60vw] h-[35vh] mx-auto ml-2 relative'"
    >
      <template #SlideContent="{ item }">
        <p class=" bottom-4 text-[15px] absolute w-full text-center">
          {{ item.name }}
        </p>
      </template>
    </TKCarousel>
  </div>
</template>

<script setup lang="ts">

const classItemsToShow = ref('fruits')

const fruits = [
    {
      index: 1,
      name: 'Fresas',
      image: '/images/landing/products/frutas/fresas.webp',
    },
    {
      index: 2,
      name: 'Ciruela',
      image: '/images/landing/products/frutas/ciruela.webp',
    },
    {
      index: 3,
      name: 'Kiwi',
      image: '/images/landing/products/frutas/kiwi.webp',
    },
    {
      index: 4,
      name: 'Mango',
      image: '/images/landing/products/frutas/mango.webp',
    },
    {
      index: 5,
      name: 'Manzana',
      image: '/images/landing/products/frutas/manzana.webp',
    },
    {
      index: 6,
      name: 'Naranja',
      image: '/images/landing/products/frutas/naranja.webp',
    },
    {
      index: 7,
      name: 'Limón',
      image: '/images/landing/products/frutas/limon.webp',
    }
]

const vegetables = [
  {
    index: 1,
    name: 'Acelgas',
    image: '/images/landing/products/verduras/acelgas.webp',
  },
  {
    index: 2,
    name: 'Alcachofas',
    image: '/images/landing/products/verduras/alcachofas.webp',
  },
  {
    index: 3,
    name: 'Acelgas',
    image: '/images/landing/products/verduras/acelgas.webp',
  },
  {
    index: 4,
    name: 'Alcachofas',
    image: '/images/landing/products/verduras/alcachofas.webp',
  }
]

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