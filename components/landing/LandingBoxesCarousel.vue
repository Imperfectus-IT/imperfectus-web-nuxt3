<template>
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

  
  <div class="">
    <TKCarousel
      :slide-class="'w-full ml-4'"
      :image-class="'rounded-t-[20px] w-[80vw] h-[30vh]'"
      :slot-class="'w-[80vw]'"
      :data="boxes"
      :show-navigation="false"
      :show-pagination="false"
      :items-to-show="1.2"
      :wrap-around="false"
    >
      <template #SlideContent="{ item }">
        <hr>
        <div class="h-[100px]">
          <p class=" text-left ml-2 mt-2 text-[20px]">
            {{ item.title }}
          </p>
          <p class="ml-2 mt-2 text-left text-[14px]">
            {{ item.description }}
          </p>
        </div>
        <Button
          class="w-full rounded-t-[0px] rounded-b-[20px] mt-auto"
          :label="$t('homeBoxes.buy')"
          severity="secondary"
        />
      </template>
    </TKCarousel>
  </div>
 
  <p class="text-[22px] px-4 leading-8 mb-8 mt-10">
    {{ $t('homeOffer.weOfferBoxes') }}
  </p>
</template>

<script setup lang="ts">
import type { CarouselSlideObject } from '~/components/share/TKCarousel/TKCarouselTypes';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const boxes = ref<CarouselSlideObject[]>([
  {
    index: 1,
    image: "/images/landing/boxes-carousel/S.webp",
    name: "S-box",
    title: t('content.home.ourBoxes.item0.title'),
    description: t('content.home.ourBoxes.item0.description')
    
  },
  {
    index: 2,
    image: "/images/landing/boxes-carousel/M.webp",
    name: "M-box",
    title: t('content.home.ourBoxes.item1.title'),
    description: t('content.home.ourBoxes.item1.description')
    
  },
  {
    index: 3,
    image: "/images/landing/boxes-carousel/XL.webp",
    name: "XL-box",
    title: t('content.home.ourBoxes.item2.title'),
    description: t('content.home.ourBoxes.item2.description')
    
  }
]);
</script>
~/components/talkual-ui/TKCarousel/TKCarouselTypes