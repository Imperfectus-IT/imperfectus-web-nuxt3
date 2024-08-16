<script setup lang="ts">
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes.ts'

const { t } = useI18n()

const multimediaItems = [
  {
    id: 1,
    title: t('newsroom.multimedia.images.title'),
    cover: '/images/newsroom/berenjena.webp',
    altCover: 'Producto Berenjena',
  },
  {
    id: 2,
    title: t('newsroom.multimedia.videos.title'),
    cover: '/images/newsroom/caja_xl_mixta.webp',
    altCover: 'Caja XL Mixta',
  },
]
const atworkImages = ref<CarouselSlideObject[]>([
  {
    id: useId(),
    name: t('newsroom.multimedia.images.first_slide'),
    image: '/images/landing/vegetables-carousel/3-tomate.webp',
    download: '/downloads/products.zip',
    fileName: 'talkual-products',
  },
  {
    id: useId(),
    name: t('newsroom.multimedia.images.second_slide'),
    image: '/images/landing/boxes-carousel/S.webp',
    download: '/downloads/boxes.zip',
    fileName: 'talkual-boxes',
  },
  {
    id: useId(),
    name: t('newsroom.multimedia.images.third_slide'),
    image: '/images/about/farmers/7.webp',
    download: '/downloads/farmers.zip',
    fileName: 'talkual-farmers',
  },
  {
    id: useId(),
    name: t('newsroom.multimedia.images.fourth_slide'),
    image: '/images/newsroom/oriol_marc.webp',
    download: '',
  },
])
const atworkVideos = ref<CarouselSlideObject[]>([
  {
    id: useId(),
    name: t('newsroom.multimedia.videos.first_slide'),
    image: '/images/newsroom/artwork-videos-1.webp',
    download: '/downloads/impact.mp4',
    fileName: 'talkual-impact',
  },
  {
    id: useId(),
    name: t('newsroom.multimedia.videos.second_slide'),
    image: '/images/newsroom/artwork-videos-2.webp',
    download: '/downloads/imperfections.mp4',
    fileName: 'talkual-imperfections',
  },
  {
    id: useId(),
    name: t('newsroom.multimedia.videos.third_slide'),
    image: '/images/about/farmers/5.webp',
    download: '/downloads/opening.mp4',
    fileName: 'talkual-farmers',
  },
  {
    id: useId(),
    name: t('newsroom.multimedia.videos.fourth_slide'),
    image: '/images/newsroom/artwork-videos-4.webp',
    download: '/downloads/unboxing.mp4',
    fileName: 'talkual-team' },
])

const op = ref()
const isCollapsed = ref(true)
const selectedIndex = ref(0)
const getImagesForCarousel = computed(() => selectedIndex.value === 1 ? atworkImages.value : atworkVideos.value)
const getTextColor = computed(() => isCollapsed.value ? 'text-green-quaternary' : 'text-green-tertiary')
const toggle = (event: any, index: number) => {
  op.value.toggle(event)
  selectedIndex.value = index
  isCollapsed.value = !isCollapsed.value
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
      <p :class="getTextColor">
        {{ item.title }}
      </p>
      <div class="flex justify-center mt-8 relative">
        <span
          class="mdi mdi-chevron-down absolute bottom-0 right-12 text-[2rem]"
          @click="toggle($event, item.id)"
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
      class="w-full h-[280px] bg-green-quaternary mt-[50px]"
    >
      <span class="absolute bottom-[90%] left-1/2 border-[60px] border-l-[90px] border-r-[90px] border-transparent border-b-green-quaternary -ml-[21%]" />
      <TKCarousel
        slide-class="rounded-lg py-5 mx-2"
        image-class="rounded-lg w-[270px] h-[189px] object-cover"
        :data="getImagesForCarousel"
        :show-navigation="false"
        :show-pagination="false"
        :items-to-show="1.3"
        :wrap-around="false"
      >
        <template #SlideContent="{ item }">
          <a
            :href="item.download"
            :download="item.fileName"
          >
            <span class="mdi mdi-tray-arrow-down text-xl absolute bottom-14 right-6 text-white-primary" />
          </a>
          <p class="mt-1 w-1/2 mx-auto h-8 text-[15px] text-green-tertiary font-solina-extended-book font-light text-base">
            {{ item.name }}
          </p>
        </template>
      </TKCarousel>
    </OverlayPanel>
    <div class="relative">
      <p>{{ $t('newsroom.multimedia.logos.title') }}</p>
      <NuxtImg
        class="mx-auto w-[270px] h-[189px] object-cover mt-8"
        src="/images/newsroom/talkual_banner.webp"
        format="webp"
        loading="lazy"
        alt="Banner TALKUAL"
      />
      <a
        href="/downloads/logos.zip"
        download="talkual-logos"
      >
        <span class="mdi mdi-tray-arrow-down text-xl text-green-tertiary absolute right-16 bottom-1" />
      </a>
    </div>
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
//.arrow {
//  bottom: 90%;
//  left: 48%;
//  border: solid transparent;
//  content: "";
//  position: absolute;
//  border-bottom-color: var(--color-green-quaternary);
//  border-width: 46px;
//  margin-left: -40px;
//}
</style>
