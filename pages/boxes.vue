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
        :carousel-data="imagesForCarousel('S') as object[]"
        :selected-box="boxSelected.S"
        card-order="1"
        carousel-order="2"
        @update-item-on-parent="(payload: SelectedBox) => updateBoxSelected('S', payload)"
        @create-shopping-cart="(payload: SelectedBox) => handleCreatePresetShoppingCart('S', payload)"
      />

      <CarouselAndCard
        :card-data="mBoxData"
        :carousel-data="imagesForCarousel('IM') as object[]"
        :selected-box="boxSelected.IM"
        card-order="2"
        carousel-order="1"
        @update-item-on-parent="(payload: SelectedBox) => updateBoxSelected('IM', payload)"
        @create-shopping-cart="(payload: SelectedBox) => handleCreatePresetShoppingCart('IM', payload)"
      />
      <CarouselAndCard
        :card-data="xlBoxData"
        :carousel-data="imagesForCarousel('XL') as object[]"
        :selected-box="boxSelected.XL"
        card-order="1"
        carousel-order="2"
        @update-item-on-parent="(payload: SelectedBox) => updateBoxSelected('XL', payload)"
        @create-shopping-cart="(payload: SelectedBox) => handleCreatePresetShoppingCart('XL', payload)"
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

const { activeBoxProducts } = useProductsState()
const { generateSku } = useGenerateSku()
const isDisplayDesktop = computed(() => windowWidth.value > 768)
const classItemsToShow = ref('fruits')
const { shoppingCart } = useShoppingCartState()
const router = useRouter()
const localePath = useLocalePath()
const { setShoppingCart } = useLocalStorageShoppingCartRepository()

const boxSelected = reactive({
  S: {
    content: 'mixed',
    frequency: 'weekly',
    units: 1,
  },
  IM: {
    content: 'mixed',
    frequency: 'weekly',
    units: 1,
  },
  XL: {
    content: 'mixed',
    frequency: 'weekly',
    units: 1,
  },
})

const handleCreatePresetShoppingCart = (size: string, payload: SelectedBox) => {
  const sBoxProduct: BoxProduct = activeBoxProducts.value.find((product: BoxProduct) => product.sku === `${size}R1`) as BoxProduct
  const phurcaseType = payload.frequency === 'once' ? 'order' : 'subscription'
  shoppingCart.value = createPreselectedShoppingCart(size, payload, phurcaseType, sBoxProduct)
  setShoppingCart(shoppingCart.value)
  router.push(localePath('order'))
}

const handleToggleType = (type: string) => {
  classItemsToShow.value = type
}

const imagesForCarousel = (size: Size) => {
  const sku = generateSku(boxSelected[size].content, size, boxSelected[size].frequency)
  const boxProduct = activeBoxProducts.value.find((product: BoxProduct) => product.sku === sku)
  const images = boxProduct?.allImages.map((image, index) => ({
    image: image,
    title: index,
  }))
  return images
}

const updateBoxSelected = (size: Size, payload: SelectedBox) =>
  Object.assign(boxSelected[size], payload)

const sBoxData = {
  title: t('content.home.ourBoxes.item0.title'),
  description: t('content.home.ourBoxes.item0.description'),
  price: '19.56€',
}

const mBoxData = {
  title: t('content.home.ourBoxes.item1.title'),
  description: t('content.home.ourBoxes.item1.description'),
  price: '24.47€',
}

const xlBoxData = {
  title: t('content.home.ourBoxes.item2.title'),
  description: t('content.home.ourBoxes.item2.description'),
  price: '31.33€',
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
</script>
