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
            v-if="classItemsToShow === 'Fruits'"
            class="w-3 h-3 bg-green-primary rounded-xl mr-2"
          />
          <li
            @click="classItemsToShow = 'Fruits'"
          >
            Fruta
          </li>
        </div>
        <div class="flex items-center">
          <div
            v-if="classItemsToShow === 'Vegetables'"
            class="w-3 h-3 bg-green-primary rounded-xl mr-2"
          />
          <li
            @click="classItemsToShow = 'Vegetables'"
          >
            Verduras
          </li>
        </div>
      </ul>
    </div>
    
    <Carousel
      :value="classItemsToShow === 'Fruits' ? fruits : vegetables"
      :num-visible="1"
      :num-scroll="1"
      :show-indicators="false"
    >
      <template #item="slotProps">
        <div>
          <NuxtImg
            class="bg-beige-secondary rounded-lg w-[200px] h-[222px] mx-auto"
            :src="slotProps.data.image"
            :alt="slotProps.data.name"
            :pt="{
              div: 'w-10'
            }"
          />
          <p class="absolute z-50 !text-red-primary z-50">
            test
          </p>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">

const classItemsToShow = ref('Fruits')

const fruits = [
    {
        name: 'Fresas',
        image: '/images/landing/products/frutas/fresas.webp',
    },
    {
        name: 'Ciruela',
        image: '/images/landing/products/frutas/ciruela.webp',
    },
    {
        name: 'Kiwi',
        image: '/images/landing/products/frutas/kiwi.webp',
    },
    {
        name: 'Mango',
        image: '/images/landing/products/frutas/mango.webp',
    },
    {
        name: 'Manzana',
        image: '/images/landing/products/frutas/manzana.webp',
    },
    {
      name: 'Naranja',
      image: '/images/landing/products/frutas/naranja.webp',
    },
    {
      name: 'Limón',
      image: '/images/landing/products/frutas/limon.webp',
    }
]

const vegetables = [
  {
    name: 'Acelgas',
    image: '/images/landing/products/verduras/acelgas.webp',
  },
  {
    name: 'Alcachofas',
    image: '/images/landing/products/verduras/alcachofas.webp',
  }
]
</script>