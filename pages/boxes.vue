<template>
  <Header
    class="h-[350px]"
    title-class="mb-4 text-white-primary"
    description-class="px-3"
    :title="t('boxes.header.title')"
    :description="t('boxes.header.description')"
    background-desktop="/images/boxes/header.webp"
    background-mobile="/images/boxes/header-mobile.webp"
  />
  <div class=" lg:mt-0 max-w-[1345px] mx-auto">
    <div class="mx-3 lg:w-2/3 ">
      <h4
        class="font-solina-extended-medium text-[18px] uppercase font-bold mt-12 mb-4"
      >
        {{ t("content.boxes.title") }}
      </h4>
      <p
        class="text-[25px] leading-8 mb-12 font-solina-extended-book lg:text-[40px] lg:leading-[45px]"
      >
        {{ t("boxes.our-boxes.description") }}
      </p>
    </div>
    <div class="mx-3">
      <CarouselAndCard
        :card-data="sBoxData"
        :carousel-data="imagesForCarousel('s').value"
        :selected-box="boxSelected.s"
        card-order="1"
        carousel-order="2"
        @update-item-on-parent="
          (payload: SelectedBox) => updateBoxSelected('s', payload)
        "
      />

      <CarouselAndCard
        :card-data="mBoxData"
        :carousel-data="imagesForCarousel('m').value"
        :selected-box="boxSelected.m"
        card-order="2"
        carousel-order="1"
        @update-item-on-parent="
          (payload: SelectedBox) => updateBoxSelected('m', payload)
        "
      />
      <CarouselAndCard
        :card-data="xlBoxData"
        :carousel-data="imagesForCarousel('xl').value"
        :selected-box="boxSelected.xl"
        card-order="1"
        carousel-order="2"
        @update-item-on-parent="
          (payload: SelectedBox) => updateBoxSelected('xl', payload)
        "
      />
    </div>

    <div class="mx-3 font-solina-extended-book lg:ml-12 lg:mb-4">
      <h4 class="font-solina-condensed-bold font-bold uppercase text-[18px] mb-8">
        {{ t("boxes.title") }}
      </h4>
      <p class="text-[26px] leading-8 lg:text-[40px] lg:mb-4">
        {{ t("boxes.description.1") }}
      </p>
      <p class="text-[26px] leading-8 mb-8 lg:text-[40px]">
        {{ t("boxes.description.2") }}
      </p>

      <div
        class="lg:grid lg:grid-cols-4 lg:grid-rows-2 lg:-mb-24"
        :style="{
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gridTemplateRows: '320px 320px',
          gridColumnGap: '20px',
          gridRowGap: '20px',
        }"
      >
        <BoxesBuyOptionsSubscription
          class="mb-12 lg:row-start-1 lg:col-span-2 lg:my-auto"
          :is-display-desktop="isDisplayDesktop"
          :list-items="subscriptionList"
          :title="t('boxes.subscription-description.1.title')"
        />

        <BoxesBuyOptionsOrder
          class="mb-12 lg:row-start-2 lg:col-span-2 lg:mt-6"
          :is-display-desktop="isDisplayDesktop"
          :list-items="uniqueOrderList"
          :title="t('boxes.subscription-description.2.title')"
        />

        <NuxtImg
          class="my-12 lg:col-start-3 lg:col-span-2 lg:row-start-1 lg:row-span-2 lg:my-auto lg:mx-auto"
          src="/images/boxes/shop_dark.webp"
          alt="Shop dark"
          format="webp"
          loading="lazy"
          :width="440"
          height="auto"
        />
      </div>
    </div>
  </div>
  <Divider class="text-green-primary lg:mt-28 w-[100vw]" />
  <div class="mt-16 lg:mt-0 max-w-[1600px] mx-auto">
    <p
      class="font-recoleta-regular text-[35px] mx-4 leading-10 lg:w-3/5 lg:mt-16 2xl:ml-0"
    >
      {{ t("homeProducts.description") }}
    </p>

    <div>
      <ProductListSelector
        class="lg:mt-20"
        @toggle="handleToggleType"
      />
      <ProductsCarousel
        class="mt-4"
        pagination-class="!mt-10"
        :display-desktop="true"
        :items-type="classItemsToShow"
        :visible-items="isDisplayDesktop ? 5 : 1.4"
        :navigation-next-class="'relative lg:left-[96vw] xl:left-[90vw] 2xl:left-[83vw]'"
        :navigation-prev-class="'relative lg:left-[88vw] xl:left-[82vw] 2xl:left-[78vw]'"
        :show-pagination="!isDisplayDesktop"
        :show-navigation="isDisplayDesktop"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BoxesBuyOptions from '~/components/boxes/BoxesBuyOptionsSubscription.vue'
import type { BoxImages } from '~/components/boxes/types/BoxImages'
import type { SelectedBox } from '~/components/boxes/types/BoxSelected'
import type { Size } from '~/components/boxes/types/Size'

const { t } = useI18n()

useHead({
  title: t('pages.boxes.title'),
  meta: [
    {
      name: 'description',
      content: t('pages.boxes.description'),
    },
  ],
})

defineI18nRoute({
  paths: {
    ca: '/les-nostres-caixes/',
    es: '/nuestras-cajas/',
  },
})

const { addResize, removeResize, windowWidth } = useWindowSize()

onMounted(() => {
  addResize()
})

onBeforeUnmount(() => {
  removeResize()
})

const isDisplayDesktop = computed(() => windowWidth.value > 768)
const classItemsToShow = ref('fruits')

const boxSelected = reactive({
  s: {
    content: 'mixed',
    frequency: 'weekly',
    units: 1,
  },
  m: {
    content: 'mixed',
    frequency: 'weekly',
    units: 1,
  },
  xl: {
    content: 'mixed',
    frequency: 'weekly',
    units: 1,
  },
})

const handleToggleType = (type: string) => {
  classItemsToShow.value = type
}

const imagesForCarousel = (size: Size) =>
  computed(() => {
    return boxImages[size][boxSelected[size].content as keyof BoxImages[Size]]
  })

const updateBoxSelected = (size: Size, payload: SelectedBox) =>
  Object.assign(boxSelected[size], payload)

const boxImages = {
  s: {
    mixed: [
      {
        image: '/images/boxes/sBox/S_1.webp',
        title: 'S_1',
      },

      {
        image: '/images/boxes/sBox/S_2.webp',
        title: 'S_2',
      },
      {
        image: '/images/boxes/sBox/S_3.webp',
        title: 'S_3',
      },
    ],
    fruits: [
      {
        image: '/images/boxes/sBox/SFR_1.webp',
        title: 'SFR_1',
      },

      {
        image: '/images/boxes/sBox/SFR_2.webp',
        title: 'SFR_2',
      },
      {
        image: '/images/boxes/sBox/SFR_3.webp',
        title: 'SFR_3',
      },
    ],
    vegetables: [
      {
        image: '/images/boxes/sBox/SVG_1.webp',
        title: 'SVG_1',
      },

      {
        image: '/images/boxes/sBox/SVG_2.webp',
        title: 'SVG_2',
      },
      {
        image: '/images/boxes/sBox/SVG_3.webp',
        title: 'SVG_3',
      },
    ],
  },
  m: {
    mixed: [
      {
        image: '/images/boxes/mBox/M_1.webp',
        title: 'M_1',
      },

      {
        image: '/images/boxes/mBox/M_2.webp',
        title: 'M_2',
      },
      {
        image: '/images/boxes/mBox/M_3.webp',
        title: 'M_3',
      },
    ],
    fruits: [
      {
        image: '/images/boxes/mBox/MFR_1.webp',
        title: 'MFR_1',
      },

      {
        image: '/images/boxes/mBox/MFR_2.webp',
        title: 'MFR_2',
      },
      {
        image: '/images/boxes/mBox/MFR_3.webp',
        title: 'MFR_3',
      },
    ],
    vegetables: [
      {
        image: '/images/boxes/mBox/MVG_1.webp',
        title: 'MVG_1',
      },

      {
        image: '/images/boxes/mBox/MVG_2.webp',
        title: 'MVG_2',
      },
      {
        image: '/images/boxes/mBox/MVG_3.webp',
        title: 'MVG_3',
      },
    ],
  },
  xl: {
    mixed: [
      {
        image: '/images/boxes/xlBox/XL_1.webp',
        title: 'XL_1',
      },

      {
        image: '/images/boxes/xlBox/XL_2.webp',
        title: 'XL_2',
      },
      {
        image: '/images/boxes/xlBox/XL_3.webp',
        title: 'XL_3',
      },
    ],
    fruits: [
      {
        image: '/images/boxes/xlBox/XLFR_1.webp',
        title: 'XLFR_1',
      },
      {
        image: '/images/boxes/xlBox/XLFR_2.webp',
        title: 'XLFR_2',
      },
    ],
    vegetables: [
      {
        image: '/images/boxes/xlBox/XLVG_1.webp',
        title: 'XLVG_1',
      },
      {
        image: '/images/boxes/xlBox/XLVG_2.webp',
        title: 'XLVG_2',
      },
      {
        image: '/images/boxes/xlBox/XLVG_3.webp',
        title: 'XLVG_3',
      },
    ],
  },
}

const sBoxData = {
  title: t('content.home.ourBoxes.item0.title'),
  description: t('content.home.ourBoxes.item0.description'),
  price: '19.18€',
}

const mBoxData = {
  title: t('content.home.ourBoxes.item1.title'),
  description: t('content.home.ourBoxes.item1.description'),
  price: '23.99€',
}

const xlBoxData = {
  title: t('content.home.ourBoxes.item2.title'),
  description: t('content.home.ourBoxes.item2.description'),
  price: '30.72€',
}

const subscriptionList = [
  'boxes.subscription-description.1.description.1',
  'boxes.subscription-description.1.description.2',
  'boxes.subscription-description.1.description.3',
  'boxes.subscription-description.1.description.4',
  'boxes.subscription-description.1.description.5',
  'boxes.subscription-description.1.description.6',
  'boxes.subscription-description.1.description.7',
  'boxes.subscription-description.1.description.8',
]

const uniqueOrderList = [
  'boxes.order-description.2.description.1',
  'boxes.order-description.2.description.2',
  'boxes.order-description.2.description.3',
  'boxes.order-description.2.description.4',
  'boxes.order-description.2.description.5',
]

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
  },
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
  },
]
</script>
