<template>
  <div class="bg-green-tertiary leading-none text-center pb-28">
    <h1 class="font-recoleta-regular text-[45px] text-green-quaternary py-8 lg:w-1/2 lg:text-[70px] lg:mx-auto">
      {{ t('contactForm.title1') }}
       <br class="lg:hidden" /> <span class="text-green-primary">{{ t('contactForm.title2') }}</span></h1>
    <div class="w-11/12 mx-auto lg:w-1/3">
      <h2 class="bg-green-primary py-5 rounded-t-lg font-solina-extended-medium text-[20px]" >{{ $t('contactForm.subtitle') }}</h2>
       <HubSpotForm class="rounded-b-lg" :form="'b2c'" /> 
    </div>
  </div>
  <TKTopFooterEffect class=" bg-beige-primary text-white-primary transform rotate-180"/>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>