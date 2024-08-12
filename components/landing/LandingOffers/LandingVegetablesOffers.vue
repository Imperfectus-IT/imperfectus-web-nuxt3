<template>
  <div class="lg:grid lg:grid-cols-4">
    <p
      class="text-[22px] mt-14 px-4 w-10/12 leading-8 mb-8 font-solina-extended-book lg:leading-normal lg:col-span-2 lg:text-[35px] 2xl:w-2/3 lg:ml-10 xl:mt-14"
    >
      {{ $t("homeOffer.weOfferBoxes") }}
    </p>
    <LandingVegetablesCarousel
      class="lg:col-start-3 lg:col-span-2 lg:row-start-1 lg:row-span-2"
      :show-navigation="isDesktop"
      :show-pagination="isDesktop"
      :vegetables="vegetables"
      :image-class="'lg:!h-[690px] lg:w-[720px] 2xl:w-full object-cover'"
      :pagination-class="'absolute transform left-1/2 -translate-x-1/2 bottom-[1px]'"
    />
    <LandingOffersList
      class="lg:row-start-2 lg:col-span-2 lg: lg:flex lg:flex-col lg:justify-center lg:ml-9 lg:cursor-pointer"
    />
  </div>
  <LandingOffersBanner />
</template>

<script setup lang="ts">
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes'

defineProps({
  vegetables: {
    type: Array as PropType<CarouselSlideObject[]>,
    required: true,
  },
})

const { isDesktop } = useScreenSize()
</script>
