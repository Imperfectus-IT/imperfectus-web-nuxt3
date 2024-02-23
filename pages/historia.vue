
<template>
  <div>
    <div 
    v-for="(description, index) in historyTexts" 
    :key="index" 
    class="bg-green-tertiary text-green-quaternary font-recoleta-regular text-[50px] leading-none lg:text-[60px] pb-16 px-4 first:pt-16 "
    
    >
      <p
      class="lg:w-9/12 mx-auto"
      >{{ description }}</p>
    </div>

    <TKShape class="transform rotate-180" />

    <div class="lg:flex ml-16">
      <div class="flex flex-col space-y-6 mt-6 px-4 text-green-tertiary descriptions lg:w-1/2">
      <h4 class="font-solina-condensed-bold text-[18px] font-bold ">{{ t('about.title') }}</h4>
      <p 
        v-for="(description, index) in ourDescriptions" 
        :key="index"
        :class="getTextClass(index)"
        v-html="description"
        />
    </div>

    <NuxtImg
      src="/images/about/we-are.webp"
      alt="Our team"
      class="w-11/12 mx-auto mt-6 lg:w-1/2 lg:px-44 lg:mt-20"
      loading="lazy"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const getTextClass = (index: number):string => {
  if (index === 0) {
    return 'text-[30px]'
  } else if (index === 1 || index === 2) {
    return 'font-bold text-[18px]'
  } else {
    return 'text-[18px]'
  }
}


const historyTexts: string[] = [
  t('about.description.1'),    
  t('about.description.2'),
  t('about.description.3'),
  t('about.description.4'),
  t('about.description.5')    
];

const ourDescriptions: string[] = [
  t('about.we-are.description.1'),
  t('about.we-are.description.2'),
  t('about.we-are.description.3'),
  t('about.we-are.description.4'),
  t('about.we-are.description.5') + `<span class="font-bold">${t('about.we-are.description.6.bold')}</span>`,
  t('about.we-are.description.7')
];


</script>

