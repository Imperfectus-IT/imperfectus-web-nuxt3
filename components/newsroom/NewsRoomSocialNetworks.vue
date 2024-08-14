<script setup lang="ts">
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes.ts'

const relativePath = '/images/newsroom/medios'

const itemNetworks = ref<CarouselSlideObject[]>([
  {
    id: useId(),
    name: 'Linkedin Feed',
    image: `${relativePath}/linkedin_feed.webp`,
    icon: 'mdi mdi-linkedin',
  },
  {
    id: useId(),
    name: 'Instagram Feed',
    image: `${relativePath}/instagram_feed.webp`,
    icon: 'mdi mdi-instagram',
  },
  {
    id: useId(),
    name: 'X Feed',
    image: `${relativePath}/x_feed.webp`,
    icon: 'mdi mdi-twitter',
  },
])

const networkLogos = ['mdi mdi-linkedin', 'mdi mdi-instagram', 'mdi mdi-twitter']
const currentLogo = ref('mdi mdi-linkedin')
const changeNetworkLogo = (event: any) => {
  currentLogo.value = networkLogos[event.slidingToIndex === 3 ? 0 : event.slidingToIndex]
}
</script>

<template>
  <DarkNewsRoomSection
    class="mt-8 lg:hidden"
    :title="$t('newsroom.social_network.title')"
  >
    <div class="grid grid-cols-1 gap-3 mt-5">
      <span :class="['text-2xl', currentLogo]" />
      <TKCarousel
        class="w-full"
        image-class="object-fit"
        :data="itemNetworks"
        :show-pagination="true"
        :show-navigation="false"
        @navigation-clicked="changeNetworkLogo"
      />
    </div>
  </DarkNewsRoomSection>
  <DarkNewsRoomSection
    class="mt-8 hidden lg:block"
    :title="$t('newsroom.social_network.title')"
  >
    <div class="grid grid-cols-3 gap-30 mt-5 justify-items-center xl:px-96">
      <div
        v-for="item in itemNetworks"
        :key="item.id"
      >
        <span :class="['text-2xl', item.icon]" />
        <NuxtImg
          class="mt-5 rounded-lg"
          :src="item.image"
          :alt="item.name"
          width="316"
          height="435"
          sizes="316"
          :placeholder="[316, 435]"
          loading="lazy"
        />
      </div>
    </div>
  </DarkNewsRoomSection>
</template>
