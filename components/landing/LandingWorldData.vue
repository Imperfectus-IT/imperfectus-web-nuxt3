<template>
  <div class="mt-10 bg-green-tertiary text-green-quaternary relative">
    <h2 class="text-[25px] leading-10 mt-10 mb-6 text-center">
      {{ $t('homeSolutions.title') }}
    </h2>



    

    <Carousel
      class=""
      :value="data"
      :infinity="true"
      :num-visible="1"
      :num-scroll="1"
      :show-navigators="true"
      :show-indicators="false"
      :responsive-options="responsiveProductOptions"
      :pt="{
        nextButton: 'absolute right-6 bg-green-quaternary text-green-tertiary h-9 rounded-full w-9 top-1/2 transform -translate-y-full',    
        nextButtonIcon: 'mx-auto ',
        previousButton: 'absolute left-6 bg-green-quaternary text-green-tertiary h-9 rounded-full w-9 top-1/2 transform -translate-y-full ',
        previousButtonIcon: 'mx-auto'
       
      }"
    >
      <template #item="slotProps">
        <div>
          <div 
            class="relative bg-green-primary mx-auto h-48 w-48 rounded-xxl flex items-center justify-center mt-10 border-solid border-2 border-green-primary"
            :class="slotProps.index %2 === 0 ? 'bg-green-tertiary text-green-quaternary' : 'bg-green-primary'"
          >
            <p
              class="text-center text-[24px] font-recoleta font-extrabold"
              :class="slotProps.index %2 === 0 ? 'text-green-primary' : 'text-green-tertiary'"
            >
              {{ slotProps.data.value }}
            </p>
          </div>
          <div>
            <div class="h-14 w-0.5 bg-green-primary mx-auto" />
            <div class="h-3 w-3 rounded-full bg-green-primary mx-auto" />
          </div>

          <p class="text-[20px] p-4 text-center m6-4 text-green-quaternary mx-2">
            {{ $i18n.locale === 'ca' ? slotProps.data.description_ca : slotProps.data.description_es}}
          </p>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">


onMounted(() => {
  console.log('mounted');console.log();
});

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
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);


</script>

<style lang="scss" scoped>
.test {
    @apply bg-red-primary;
}


</style>