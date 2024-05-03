<template>
  <div class="mt-10 bg-green-tertiary text-green-quaternary relative lg:py-24">
    <h2 class="text-[25px] leading-10 mt-10 mb-6 text-center lg:text-[35px]">
      {{ $t('homeSolutions.title') }}
    </h2>

    <WorldDataCarousel
      v-if="!displayDesktop"
      :data="data"
    />

    <WorldDataCards
      v-if="displayDesktop"
      :data="data"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes'

defineProps({
  displayDesktop: {
    type: Boolean,
    required: true,
  },
})

const data = ref<CarouselSlideObject[]> ([
  {
    index: 1,
    value: '1.300 M',
    description_ca:
            '1.300 milions de tones d\'aliments malgastats cada any al nostre país',
    description_es:
            '1.300 millones de toneladas de alimentos desperdiciados cada año en nuestro país',
  },
  {
    index: 2,
    value: '30%',
    description_ca: '30% del menjar mundial és malbaratat',
    description_es: '30% de la comida mundial es desperdiciada',
  },
  {
    index: 3,
    value: '10%',
    description_ca:
            '10% de les emissions de gas provenen del malbaratament alimentari',
    description_es:
            '10% de las emisiones de gas provienen del derroche alimentario',
  },
  {
    index: 4,
    value: '143.000 M€',
    description_ca:
            '143.000 milions d\'euros desaprofitats a Europa cada any a causa del malbaratament d\'aliments',
    description_es:
            '143.000 millones de euros desperdiciados en Europa cada año debido al desperdicio de alimentos',
  },
])
</script>
