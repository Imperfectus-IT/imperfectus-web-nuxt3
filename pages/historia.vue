<template>
  <div>
    <div 
    v-for="text in historyTexts" 
    :key="text.index" 
    class="bg-green-tertiary text-green-quaternary font-recoleta-regular text-[50px] leading-none lg:text-[60px] pb-16 px-4 first:pt-16 "
    >
      <p>{{ text.description }}</p>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();


const historyTexts: IHistoryTexts[] = [
    {
      index: 1,
      description: t('about.description.1')
    },
    {
      index: 2,
      description: t('about.description.2')
    },
    {
      index: 3,
      description: t('about.description.3')
    },
    {
      index: 4,
      description: t('about.description.4')
    },
    {
      index: 5,
      description: t('about.description.5')
    }
]


export interface IHistoryTexts {
    index: number;
    description: string;
}

</script>