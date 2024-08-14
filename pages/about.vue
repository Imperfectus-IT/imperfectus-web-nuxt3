<template>
  <div>
    <div
      v-for="(description, index) in historyTexts"
      :key="index"
      class="bg-green-tertiary text-green-quaternary font-recoleta-regular text-[50px] leading-none lg:text-[60px] pb-16 px-4 first:pt-16 "
    >
      <MDC
        class="lg:w-3/4 mx-auto"
        :value="description"
      />
    </div>

    <TKTopFooterEffect class="transform rotate-180" />

    <div class="lg:flex lg:ml-16 ">
      <div class="flex flex-col space-y-6 mt-6 px-4 text-green-tertiary descriptions lg:w-1/2">
        <h4 class="font-solina-extended-medium text-[18px] font-bold ">
          {{ t('about.title') }}
        </h4>
        <MDC
          v-for="(description, index) in ourDescriptions"
          :key="index"
          :class="getTextClass(index)"
          :value="description"
        />
      </div>

      <NuxtImg
        src="/images/about/we-are.webp"
        alt="Our team"
        class="w-11/12 mx-auto mt-6 lg:w-[510px] lg:h-[600px] lg:mt-20 lg:rounded-xl"
        loading="lazy"
        format="webp"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineI18nRoute({
  paths: {
    ca: '/historia/',
    es: '/historia/',
  },
})

const getTextClass = (index: number): string => {
  if (index === 0) {
    return 'text-[30px]'
  }
  else if (index === 1 || index === 2) {
    return 'font-bold text-[18px]'
  }
  else {
    return 'text-[18px]'
  }
}

const historyTexts: string[] = [
  t('about.description.1'),
  t('about.description.2'),
  t('about.description.3'),
  t('about.description.4'),
  t('about.description.5'),
]

const ourDescriptions: string[] = [
  t('about.we-are.description.1'),
  t('about.we-are.description.2'),
  t('about.we-are.description.3'),
  t('about.we-are.description.4'),
  t('about.we-are.description.5'),
  t('about.we-are.description.6'),
]
</script>
