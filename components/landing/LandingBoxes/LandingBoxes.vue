<template>
  <div class="">
    <p class="mb-6 mt-4 text-left text-[30px] mx-10 lg:w-[45vw] lg:ml-28 lg:mt-2">
      {{ $t('homeBoxes.description') }}
    </p>

    <div class="mb-8 lg:ml-28">
      <div
        class="inline-block ml-4 w-3 h-3 !bg-green-primary rounded-xl mr-1 lg:ml-0 lg:mr-2 lg:h-3.5 lg:w-3.5"
      />
      <Nuxt-link to="boxes">
        {{ $t('homeBoxes.howToWorks') }}
      </Nuxt-link>
    </div>
  </div>
  <LandingBoxesCarousel
    v-if="!displayDesktop"
    :boxes="boxes"
  />
  <LandingBoxesCards
    v-if="displayDesktop"
    :boxes="boxes"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes'

const { t } = useI18n()

defineProps({
  displayDesktop: {
    type: Boolean,
    required: true,
  },
})

const boxes = ref<CarouselSlideObject[]>([
  {
    index: 1,
    image: '/images/landing/boxes-carousel/S.webp',
    name: 'S-box',
    title: t('content.home.ourBoxes.item0.title'),
    description: t('content.home.ourBoxes.item0.description'),

  },
  {
    index: 2,
    image: '/images/landing/boxes-carousel/M.webp',
    name: 'M-box',
    title: t('content.home.ourBoxes.item1.title'),
    description: t('content.home.ourBoxes.item1.description'),

  },
  {
    index: 3,
    image: '/images/landing/boxes-carousel/XL.webp',
    name: 'XL-box',
    title: t('content.home.ourBoxes.item2.title'),
    description: t('content.home.ourBoxes.item2.description'),

  },
])
</script>
