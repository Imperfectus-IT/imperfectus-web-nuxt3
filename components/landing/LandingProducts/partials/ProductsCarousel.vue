<template>
  <TKCarousel
    class="lg:col-start-2 lg:col-span-2 lg:row-start-3"
    :data="itemsType === 'fruits' ? fruits : vegetables"
    :visible-items="wrapItems()"
    :show-pagination="!displayDesktop"
    :show-navigation="displayDesktop"
    :image-class="'py-4 relative bottom-2 w-[200px] h-[225px] mx-auto object-cover'"
    :slide-class="'bg-beige-secondary  rounded-[20px] w-[230px] h-[240px] lg:w-[280px] lg:h-[250px] mx-auto lg:mr-2 relative'"
    :pagination-class="'absolute transform left-1/2 -translate-x-1/2 bottom-[-10px] text-red-primary xl:bottom-0'"
    :navigation-container-class="'absolute bottom-[120%]'"
    :navigation-next-class="'relative left-[66vw]'"
    :navigation-prev-class="'relative left-[60vw]'"
  >
    <template #SlideContent="{ item }">
      <p class="bottom-7 text-[15px] absolute w-full text-center font-bold">
        {{ locale === 'es' ? item.name_es : item.name_ca }}
      </p>
    </template>
  </TKCarousel>
</template>

<script setup lang="ts">
import { useWindowSize } from '@/composables/useWindowSize'

const { addResize, removeResize, windowWidth } = useWindowSize()
const { locale } = useI18n()

defineProps({
  itemsType: {
    type: String,
    default: 'vegetables',
  },
  displayDesktop: {
    type: Boolean,
    required: true,
  },
})

onMounted(() => {
  addResize()
})

onBeforeUnmount(() => {
  removeResize()
})

const wrapItems = () => {
  return windowWidth.value < 768 ? 1.4 : windowWidth.value < 1450 ? 3 : windowWidth.value < 1950 ? 4 : 5
}

const { products } = useGetProductsHandler()

const fruits = computed(() => {
  return products.value.itemProducts.fruits.filter(product => product.isActive)
})
const vegetables = computed(() => {
  return products.value.itemProducts.vegetables.filter(product => product.isActive)
})
</script>
