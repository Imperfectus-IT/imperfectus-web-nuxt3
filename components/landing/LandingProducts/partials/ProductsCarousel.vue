<template>
<TKCarousel
      class="lg:col-start-2 lg:col-span-2 lg:row-start-3"
      :data="itemsType === 'fruits' ? fruits : vegetables"
      :visible-items="wrapItems()"
      :show-pagination="displayDesktop ? false : true"
      :show-navigation="false"
      :wrap-items="displayDesktop ? false : true"
      :image-class="'py-4 relative bottom-2 h-[30vh] w-[55vw] mx-auto object-cover'"
      :slide-class="'bg-beige-secondary  rounded-[20px] w-[60vw] h-[35vh] lg:h-[30vh] mx-auto ml-2 lg:mr-6 relative'"
    >
      <template #SlideContent="{ item }">
        <p class=" bottom-4 text-[15px] absolute w-full text-center font-bold">
          {{ item.name }}
        </p>
      </template>
    </TKCarousel>
</template>

<script setup lang="ts">
import { useWindowSize } from '@/composables/useWindowSize';

const { addResize, removeResize, windowWidth } = useWindowSize();


defineProps({
  itemsType: {
    type: String,
    default: 'vegetables'
  },
  displayDesktop: {
    type: Boolean,
    required: true
  }
})

onMounted(() => {
  addResize();
});

onBeforeUnmount(() => {
  removeResize();
});

const wrapItems = () => {
  return windowWidth.value < 768 ? 1.4
    : windowWidth.value < 1450 ? 3
    : 4
}


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
</script>