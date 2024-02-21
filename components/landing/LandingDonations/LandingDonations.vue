<template>
  <div>
    <div class="mt-4">
      <div class="lg:grid lg:grid-cols-2 lg:grid-rows-1">
        <h2 class="font-recoleta-regular text-[42px] ml-8 font-semibold lg:col-start-2 lg:row-start-1">
          {{ $t('homeDonations.title') }}
        </h2>
        <NuxtImg
          class="lg:col-start-1 lg:mx-auto lg:w-[400px] lg:row-start-1 lg:row-span-2"
          src="/images/landing/donations/picture.webp"
          alt="Donations"
        />
        <p 
        class="mx-10 my-6 text-[17px] leading-7 
          lg:col-start-2 lg:col-span-2 lg:text-[20px] lg:row-start-1 lg:mt-28
        ">
          {{ $t('homeDonations.description') }}
        </p>
      </div>
      <LandingDonationsCarousel
        v-if="!displayDesktop"
        :data="donations"
      />
      <LandingDonationsCards
        v-if="displayDesktop"
        :data="donations"
      />
    </div>
  </div>
</template>


<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes';
import { ref } from 'vue';
const { t } = useI18n();

defineProps({
  displayDesktop: {
    type: Boolean,
    required: true
  }
})

const donations = ref<CarouselSlideObject[]>([
  {
    index: 1,
    title: t('homeDonations.foundation1.title'),
    description: t('homeDonations.foundation1.description'),
    image: '/images/landing/donations/donations1.webp'
  },
  {
    index: 2,
    title: t('homeDonations.foundation2.title'),
    description: t('homeDonations.foundation2.description'),
    image: '/images/landing/donations/donations2.webp'
  },
  {
    index: 3,
    title: t('homeDonations.foundation3.title'),
    description: t('homeDonations.foundation3.description'),
    image: '/images/landing/donations/donations3.webp'
  }
])

</script>

