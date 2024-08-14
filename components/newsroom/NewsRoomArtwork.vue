<script setup lang="ts">
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes.ts'

const { t } = useI18n()

const multimediaItems = [
  {
    id: useId(),
    title: t('newsroom.multimedia.images.title'),
    cover: '/images/newsroom/berenjena.webp',
    altCover: 'Producto Berenjena',
  },
  {
    id: useId(),
    title: t('newsroom.multimedia.videos.title'),
    cover: '/images/newsroom/caja_xl_mixta.webp',
    altCover: 'Caja XL Mixta',
  },
  {
    id: useId(),
    title: t('newsroom.multimedia.logos.title'),
    cover: '/images/newsroom/talkual_banner.webp',
    altCover: 'Banner TALKUAL',
  },
]

const atworkImages = ref<CarouselSlideObject[]>([
  {
    id: useId(),
    name: t('newsroom.multimedia.images.first_slide'),
    image: '/images/landing/vegetables-carousel/3-tomate.webp',
  },
  {
    id: useId(),
    name: t('newsroom.multimedia.images.second_slide'),
    image: '/images/landing/boxes-carousel/S.webp',
  },
  {
    id: useId(),
    name: t('newsroom.multimedia.images.third_slide'),
    image: '/images/about/farmers/7.jpg',
  },
  {
    id: useId(),
    name: t('newsroom.multimedia.images.fourth_slide'),
    image: '/images/newsroom/oriol_marc.webp',
  },
])

const op = ref()

const toggle = (event: any) => {
  op.value.toggle(event)
}
</script>

<template>
  <DarkNewsRoomSection
    class="lg:hidden"
    :title="$t('newsroom.multimedia.title')"
  >
    <div
      v-for="item in multimediaItems"
      :key="item.id"
      class="font-solina-extended-book font-light text-base my-6"
    >
      <p>{{ item.title }}</p>
      <div class="flex justify-center mt-8 relative">
        <span
          class="mdi mdi-chevron-down absolute bottom-0 right-12 text-[2rem]"
          @click="toggle"
        />
        <NuxtImg
          :src="item.cover"
          :alt="item.altCover"
          width="270"
          height="189"
          sizes="270"
          :placeholder="[270, 189]"
          preload
        />
      </div>
    </div>
    <OverlayPanel
      ref="op"
      class="w-full h-[250px] bg-green-quaternary mt-[50px]"
    >
      <span class="arrow" />
      <TKCarousel
        slide-class="rounded-lg py-5"
        image-class="rounded-lg w-[270px] h-[189px] object-cover"
        :data="atworkImages"
        :show-navigation="false"
        :show-pagination="false"
        :items-to-show="1.3"
        :wrap-around="false"
      >
        <template #SlideContent="{ item }">
          <p class="text-[15px] absolute -bottom-1 right-0 left-0 text-green-tertiary font-solina-extended-book font-light text-base">
            {{ item.name }}
          </p>
        </template>
      </TKCarousel>
    </OverlayPanel>
  </DarkNewsRoomSection>
  <DarkNewsRoomSection
    class="hidden lg:block"
    :title="$t('newsroom.multimedia.title')"
  >
    <div class="flex gap-5 justify-center">
      <div
        v-for="item in multimediaItems"
        :key="item.id"
        class="mt-16"
      >
        <p class="text-[2rem] text-green-quaternary font-solina-extended-book font-light">
          {{ item.title }}
        </p>
        <NuxtImg
          class="mt-8 rounded-lg w-[270px] h-[189px] object-cover"
          :src="item.cover"
          :alt="item.altCover"
          :placeholder="[270, 189]"
          preload
        />
      </div>
    </div>
  </DarkNewsRoomSection>
</template>

<style lang="scss" scoped>
.arrow {
  bottom: 100%;
  left: 50%;
  border: solid transparent;
  content: "";
  position: absolute;
  border-bottom-color: var(--color-green-quaternary);
  border-width: 40px;
  margin-left: -40px;
}
</style>
