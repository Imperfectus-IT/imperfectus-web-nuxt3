<template>
  <div>
    <div class="mt-4">
      <h2 class="font-recoleta-regular text-[42px] ml-8 font-semibold">
        {{ $t('homeDonations.title') }}
      </h2>
      <NuxtImg
        src="/images/landing/donations/picture.webp"
        alt="Donations"
      />
      <p class="mx-10 my-6 text-[17px] leading-7">
        {{ $t('homeDonations.description') }}
      </p>
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

