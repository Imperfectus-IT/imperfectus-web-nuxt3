<template>
  <div class=" mt-12 lg:my-12 ">
    <h4 class="!font-bold text-[16px] mt-4">
      {{ $t('orders.order.carouselTitle') }}
    </h4>
    <Divider class="mt-2 !w-2/3" />
    <TKCarousel
      :data="products"
      :visible-items="isMobile ? 4 : 3.5"
      :show-pagination="false"
      :show-navigation="true"
      :image-class="getImageClass"
      slide-class="h-20 lg:h-auto"
      navigation-prev-class="absolute right-8 bg-transparent text-green-tertiary !text-2xl"
      navigation-next-class="absolute left-8 bg-transparent text-green-tertiary !text-2xl"
      class="w-11/12 mx-auto"
      slot-class="leading-3"
    >
      <template #SlideContent="{ item }">
        <p class="text-[12px] ">
          {{ item[`name${getLocaleName}`] }}
        </p>
      </template>
    </TKCarousel>
  </div>
</template>

<script setup lang='ts'>
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes'

const { isMobile } = useScreenSize()
const { locale } = useI18n()

defineProps<{
  products: CarouselSlideObject[]
}>()

const getImageClass = computed(() => {
  return isMobile.value ? ' w-[50px] h-[50px] object-cover' : ' w-[140px] h-[140px] object-cover'
})
const getLocaleName = computed(() => locale.value === 'es' ? 'Es' : 'Ca')
</script>
