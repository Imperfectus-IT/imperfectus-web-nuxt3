<template>
  <div class="mt-10 bg-green-tertiary text-green-quaternary relative">
    <h2 class="text-[25px] leading-10 mt-10 mb-6 text-center">
      {{ $t('homeSolutions.title') }}
    </h2>

    <TKCarousel
      :data="data"
      :show-pagination="true"
      :show-navigation="false"
      :slide-class="'h-full'"
    >
      <template #SlideContent="{ item }">
        <div class="flex flex-col items-center w-5/6 mx-auto ">
          <div
            class="border-2 border-green-primary h-52 w-52 rounded-full flex flex-col justify-center m-0 p-0"
            :class="item.id % 2 === 0 ? 'bg-green-primary' : 'bg-green-tertiary'"
          >
            <p
              class="font-recoleta-medium text-xl"
              :class="item.id % 2 === 0 ? 'text-green-tertiary' : 'text-green-quaternary'"
            >
              {{ item.value }}
            </p>
          </div>  
          <div class="bg-green-primary h-10 w-0.5" />
          <div class="bg-green-primary h-3 w-3 rounded-full" />
          <p class="text-lg mt-4 mb-20">
            {{ item['description_' + localeLanguage] }}
          </p>
        </div>
      </template>
    </TKCarousel>
  </div>
</template>

<script setup lang="ts">

import { useI18n } from 'vue-i18n'
onMounted(() => {
  console.log('mounted')
  console.log(window.innerWidth);
  
})

const localeLanguage = computed(() => {
  return useI18n().locale.value;
})



const data =  [
        {
          id: 1,
          value: '1.300 M',
          description_ca:
            "1.300 milions de tones d'aliments malgastats cada any al nostre país",
          description_es:
            '1.300 millones de toneladas de alimentos desperdiciados cada año en nuestro país'
        },
        {
          id: 2,
          value: '30%',
          description_ca: '30% del menjar mundial és malbaratat',
          description_es: '30% de la comida mundial es desperdiciada'
        },
        {
          id: 3,
          value: '10%',
          description_ca:
            '10% de les emissions de gas provenen del malbaratament alimentari',
          description_es:
            '10% de las emisiones de gas provienen del derroche alimentario'
        },
        {
          id: 4,
          value: '143.000 M€',
          description_ca:
            "143.000 milions d'euros desaprofitats a Europa cada any a causa del malbaratament d'aliments",
          description_es:
            '143.000 millones de euros desperdiciados en Europa cada año debido al desperdicio de alimentos'
        }
      ]


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
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>