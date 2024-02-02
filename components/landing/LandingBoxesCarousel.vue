<template>
  <div>
    <div class="">
      <p class="my-10 text-left text-[30px] mx-10">
        {{ $t('homeBoxes.description') }}
      </p>

      <div class="mb-8">
        <div
          class="inline-block ml-4 w-3 h-3 !bg-green-primary rounded-xl mr-1 "
        />
        <Nuxt-link to="boxes">
          {{ $t('homeBoxes.howToWorks') }}
        </Nuxt-link>
      </div>
    </div>

    <!-- Carousel -->
    <Carousel
      :value="boxes"
      :num-visible="1"
      :num-scroll="1"
      :show-navigators="false"
      :show-indicators="false"
      :responsive-options="responsiveProductOptions"
      :pt="{ item: 'flex shrink-0 grow gap-3 mr-6 w-4/5'}"
    >
      <template #item="slotProps">
        <div class="relative h-[400px] ml-4">
          <NuxtImg
            :alt="slotProps.data.name"
            :src="slotProps.data.image"
            class="rounded-t-[30px] h-3/6"
          />
          <hr>
          <div class="text-[20px] font-light mt-4 pl-2">
            {{ slotProps.data.title }}
          </div>
          <p class="pl-2 text-sm mb-4 mt-2 leading-5">
            {{ slotProps.data.description }}
          </p>
          <Button
            class="w-full !ml-0 rounded-t-[0px] rounded-b-[15px]"
            :label="$t('homeBoxes.buy')"
            severity="secondary"
          />
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const responsiveProductOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);       

const boxes = ref([
  {
    index: 5,
    image: "/images/landing/boxes-carousel/S.webp",
    title: t('content.home.ourBoxes.item0.title'),
    description: t('content.home.ourBoxes.item0.description'),
    name: "S-box",
  },
  {
    id: 6,
    image: "/images/landing/boxes-carousel/M.webp",
    title: t('content.home.ourBoxes.item1.title'),
    description: t('content.home.ourBoxes.item1.description'),
    name: "M-box",
  },
  {
    id: 7,
    image: "/images/landing/boxes-carousel/XL.webp",
    title: t('content.home.ourBoxes.item2.title'),
    description: t('content.home.ourBoxes.item2.description'),
    name: "XL-box",
  }
]);

</script>