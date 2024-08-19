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
    download: 'https://drive.usercontent.google.com/uc?id=1Tr7QK_JymtFJShuZQBiHgt7p3PdGiK65&export=download',
  },
  {
    id: useId(),
    name: t('newsroom.multimedia.images.second_slide'),
    image: '/images/landing/boxes-carousel/S.webp',
    download: 'https://drive.usercontent.google.com/uc?id=1IN0HUQeoXUnmXEv3NJCwbsSjZ1T_AuEW&export=download',
  },
  {
    id: useId(),
    name: t('newsroom.multimedia.images.third_slide'),
    image: '/images/about/farmers/7.webp',
    download: 'https://drive.usercontent.google.com/uc?id=1vmQ-Xu89AkS0Ci9-1VBSr9Kq943ZEtqE&export=download',
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
    download: 'https://drive.usercontent.google.com/uc?id=1C2M6ev2hp0g1gn7dFYAnw6AF7ngGHLAJ&export=download',
  },
  {
    id: useId(),
    name: t('newsroom.multimedia.videos.second_slide'),
    image: '/images/newsroom/artwork-videos-2.webp',
    download: 'https://drive.usercontent.google.com/uc?id=1Ypf7tCnrw1V636Qz9mf-MxQr2iGITlCe&export=download',
  },
  {
    id: useId(),
    name: t('newsroom.multimedia.videos.third_slide'),
    image: '/images/about/farmers/5.webp',
    download: 'https://drive.usercontent.google.com/uc?id=1UGDGwmhb6FvhWzG1uSCfhUfVjf7ghHqh&export=download',
  },
  {
    id: useId(),
    name: t('newsroom.multimedia.videos.fourth_slide'),
    image: '/images/newsroom/artwork-videos-4.webp',
    download: 'https://drive.usercontent.google.com/uc?id=1CysxZLXm1iysGnSOmRQnV4jzsBrGZBvO&export=download',
  },
])
const op = ref()

const getTextColor = computed(() => imagesTableCollapsed.value ? 'text-green-quaternary' : 'text-green-tertiary')
const getIconDirection = (key: string) => imagesToShowOnTable[key] ? 'mdi-chevron-down' : 'mdi-chevron-up'
const getOpacity = (key: string) => showDownloadIcons[key] ? 'opacity-80' : ''

const selectedMultimediaItems = ref(1)
const getImages = computed(() => selectedMultimediaItems.value === 1 ? atworkImages.value : atworkVideos.value)

const toggle = (event: any, index: number) => {
  op.value.toggle(event)
  selectedMultimediaItems.value = index
  setIsCollapsed(index)
}

const showDownloadIcons = reactive<Record<string, boolean>>({})
const setShowDownloadIcon = (image: string, value: boolean) => {
  showDownloadIcons[image] = value
}

const imagesToShowOnTable = reactive<Record<string, boolean>>({ 1: false, 2: false })
const setIsCollapsed = (key: number) => {
  if (key === 1) {
    imagesToShowOnTable['2'] = false
  }
  else {
    imagesToShowOnTable['1'] = false
  }
  imagesToShowOnTable[key] = !imagesToShowOnTable[key]
}

const displayCards = (index: number) => {
  selectedMultimediaItems.value = index
  setIsCollapsed(index)
}
const imagesTableCollapsed = computed(() => Object.values(imagesToShowOnTable).every(value => !value))
</script>

<template>
  <DarkNewsRoomSection
    class="lg:hidden"
    :title="$t('newsroom.multimedia.title')"
  >
    <div
      v-for="(item, index) in multimediaItems"
      :key="item.id"
      class="font-solina-extended-book font-light text-base my-6"
    >
      <p :class="getTextColor">
        {{ item.title }}
      </p>
      <div class="flex justify-center mt-8 relative">
        <span
          :class="['mdi mdi-chevron-down absolute bottom-0 right-12 text-[2rem]', getIconDirection(JSON.stringify(index+1))]"
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
        :data="getImages"
        :show-navigation="false"
        :show-pagination="false"
        :items-to-show="1.3"
        :wrap-around="false"
      >
        <template #SlideContent="{ item }">
          <a
            :href="item.download"
            target="_blank"
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
      <p :class="getTextColor">
        {{ $t('newsroom.multimedia.logos.title') }}
      </p>
      <NuxtImg
        class="mx-auto w-[270px] h-[189px] object-cover mt-8"
        src="/images/newsroom/talkual_banner.webp"
        format="webp"
        loading="lazy"
        alt="Banner TALKUAL"
      />
      <a
        href="https://drive.usercontent.google.com/u/0/uc?id=1Yh2vteS3yLbybjh4rr7UVKFqCgABdNMT&export=download"
        download="talkual-logos"
        target="_blank"
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
        v-for="(item, index) in multimediaItems"
        :key="item.id"
        class="mt-16 relative"
      >
        <p class="text-[2rem] text-green-quaternary font-solina-extended-book font-light">
          {{ item.title }}
        </p>
        <span
          :class="['mdi absolute bottom-0 right-3 text-[2rem] cursor-pointer', getIconDirection(JSON.stringify(index+1))]"
          @click="displayCards(item.id)"
        />
        <NuxtImg
          class="mt-8 rounded-lg w-[270px] h-[189px] object-cover"
          :src="item.cover"
          :alt="item.altCover"
          :placeholder="[270, 189]"
          preload
        />
      </div>
      <div
        class="relative mt-16"
        @mouseenter="setShowDownloadIcon('tk-logotipos', true)"
        @mouseleave="setShowDownloadIcon('tk-logotipos', false)"
      >
        <p class="text-[2rem] text-green-quaternary font-solina-extended-book font-light">
          {{ $t('newsroom.multimedia.logos.title') }}
        </p>
        <NuxtImg
          :class="['mx-auto w-[270px] h-[189px] object-cover mt-8 rounded-lg hover:opacity-80 cursor-pointer', getOpacity('tk-logotipos')]"
          src="/images/newsroom/talkual_banner.webp"
          format="webp"
          loading="lazy"
          alt="Banner TALKUAL"
        />
        <a
          v-if="showDownloadIcons['tk-logotipos']"
          href="https://drive.usercontent.google.com/u/0/uc?id=1Yh2vteS3yLbybjh4rr7UVKFqCgABdNMT&export=download"
          download="talkual-logos"
          target="_blank"
          class="inset-0 flex items-center justify-center absolute h-[130%] "
        >
          <span class="mdi mdi-tray-arrow-down text-[70px] text-white-primary" />
        </a>
      </div>
    </div>
    <div
      v-if="!imagesTableCollapsed"
      class="flex flex-row justify-center"
    >
      <div
        v-for="item in getImages"
        :key="item.image"
        class="relative flex flex-col items-center mx-3 mt-10  hover:opacity-80"
        @mouseenter="setShowDownloadIcon(item.image as string, true)"
        @mouseleave="setShowDownloadIcon(item.image as string, false)"
      >
        <NuxtImg
          class="w-[230px] h-[189px] rounded-lg object-cover cursor-pointer"
          :src="item.image"
        />
        <a
          v-if="showDownloadIcons[item.image as string]"
          :href="item.download"
          target="_blank"
          class="z-10 absolute inset-0 flex items-center justify-center"
        >
          <span class="mdi mdi-tray-arrow-down text-[70px] text-white-primary" />
        </a>
      </div>
    </div>
  </DarkNewsRoomSection>
</template>
