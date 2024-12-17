<template>
  <Header
    class="h-[350px]"
    :title="t('layout.navbar.boxes.special')"
    background-desktop="/images/special/oranges/orange_header.webp"
    background-mobile="/images/special/oranges/orange_header.webp"
  />

  <div class="max-w-[1345px] mx-auto">
    <div class="">
      <h4 class="font-solina-extended-book mt-8 mx-3 text-[26px] leading-8 lg:text-[35px] lg:leading-10 lg:whitespace-break-spaces">
        {{ t("boxes.our-boxes.oranges-box.description.1") }}
      </h4>
      <p class="px-3 font-solina-extended-medium font-bold text-[18px] my-5">
        {{ t("boxes.our-boxes.oranges-box.title") }}
      </p>
    </div>

    <CarouselAndCard
      class="mx-3 lg:mx-1"
      :box-options="orangeBoxOptions"
      :carousel-data="getImagesForCarousel()"
      :card-data="getCardData"
      :selected-box="boxSelected.orange"
      card-order="1"
      carousel-order="2"
      @update-item-on-parent="updateSelectedBox"
      @create-shopping-cart="handleCreatePresetShoppingCart"
    />

    <TKCarousel
      :data="orangeImages"
      slide-class="w-11/12 h-[auto] lg:mx-auto"
      image-class="rounded-[10px] xl:w-[230px] xl:h-[200px] object-cover"
      :show-navigation="false"
      :show-pagination="!displayDesktop"
      :items-to-show="displayDesktop ? 5 : 1"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { OrangeBoxImages } from './types/OrangeBoxImages'
import type { SelectedOrangeBox } from './types/OrangeBoxSelected'
import type { SelectedBox } from '~/components/boxes/types/BoxSelected.ts'

const { t } = useI18n()

useHead({
  title: t('pages.special.title'),
  meta: [
    {
      name: 'description',
      content: t('pages.special.description'),
    },
  ],
})

defineI18nRoute({
  paths: {
    ca: '/caixes-estacionals/',
    es: '/cajas-estacionales/',
  },
})

const { addResize, removeResize, windowWidth } = useWindowSize()
onMounted(() => {
  addResize()
})

onBeforeUnmount(() => {
  removeResize()
})

const displayDesktop = computed(() => windowWidth.value > 768)

const { shoppingCart } = useShoppingCartState()
const { setShoppingCart } = useLocalStorageShoppingCartRepository()
const { activeBoxProducts } = useProductsState()
const router = useRouter()
const localePath = useLocalePath()

const handleCreatePresetShoppingCart = (payload: SelectedBox) => {
  const size = payload.content === 'SOrange' ? 'S' : payload.content === 'IMOrange' ? 'IM' : 'XL'
  payload = {
    ...payload,
    content: 'orange',
  }
  const boxProduct: BoxProduct = activeBoxProducts.value.find((product: BoxProduct) => product.sku === `${size}R1Orange`) as BoxProduct
  const phurcaseType = payload.frequency === 'once' ? 'order' : 'subscription'
  shoppingCart.value = createPreselectedShoppingCart(size, payload, phurcaseType, boxProduct)
  setShoppingCart(shoppingCart.value)
  router.push(localePath('order'))
}

const orangeBoxProducts = computed(() => activeBoxProducts.value.filter((product: BoxProduct) => product.sku.includes('R1Orange')))

const orangeBoxData = computed(() => {
  return orangeBoxProducts.value.map((product: BoxProduct) => {
    return {
      title: product.nameEs,
      description: product.descriptionEs,
      price: product.price + '€',
      sku: product.sku,
    }
  })
})

const boxSelected = reactive({
  orange: {
    content: 'IMOrange',
    frequency: 'weekly',
    units: 1,
  },
})

const getCardData = computed(() => {
  const defaultCardData = { title: '', description: '', price: '', sku: '' }
  if (boxSelected.orange.content === 'SOrange') {
    return orangeBoxData.value.find(product => product.sku === 'SR1Orange') || defaultCardData
  }
  else if (boxSelected.orange.content === 'IMOrange') {
    return orangeBoxData.value.find(product => product.sku === 'IMR1Orange') || defaultCardData
  }
  else {
    return orangeBoxData.value.find(product => product.sku === 'XLR1Orange') || defaultCardData
  }
})

const getImagesForCarousel = () => {
  return orangeBoxesImages[
    boxSelected.orange.content as keyof OrangeBoxImages
  ]
}

const updateSelectedBox = (payload: SelectedOrangeBox) => {
  Object.assign(boxSelected.orange, payload)
}

const orangeBoxOptions = [
  {
    name: t('orderItemSize.small'),
    value: 'SOrange',
  },
  {
    name: t('orderItemSize.medium'),
    value: 'IMOrange',
  },
  {
    name: t('orderItemSize.large'),
    value: 'XLOrange',
  },
]

const orangeBoxesImages: OrangeBoxImages = {
  SOrange: [
    {
      image: '/images/boxes/orange/S.webp',
      title: 'Orange Box S',
    },
  ],
  IMOrange: [
    {
      image: '/images/boxes/orange/IM.webp',
      title: 'Orange Box M',
    },
  ],
  XLOrange: [
    {
      image: '/images/boxes/orange/XL.webp',
      title: 'Orange Box L',
    },
  ],
}

const orangeImages = [
  {
    image: '/images/special/oranges/oranges-1.webp',
    title: 'Orange 1',
  },
  {
    image: '/images/special/oranges/oranges-2.webp',
    title: 'Orange 2',
  },
  {
    image: '/images/special/oranges/oranges-3.webp',
    title: 'Orange 3',
  },
]
</script>
