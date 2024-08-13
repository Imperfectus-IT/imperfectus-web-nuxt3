<script setup lang="ts">
const companies = [
  'alohas.webp',
  'alsa.webp',
  'chep.webp',
  'cooltra.webp',
  'decathlon.webp',
  'hannlin.webp',
  'ilerna.webp',
  'innovamat.webp',
  'mail-boxes.webp',
  'motor-tarrega.webp',
  'nomad-coffee.webp',
  'oriols.webp',
]
</script>

<template>
  <div
    class="pl-4 pr-4 py-[30px] md:flex  md:flex-col md:self-center md:p-8"
  >
    <SectionTitle
      :value="$t('companies.healthy.title')"
      class="text-xl lg:text-[36px]"
      title-class="mb-10"
    />

    <div class="flex flex-wrap items-center justify-start gap-x-6 gap-y-8 lg:w-1/2 lg:mx-auto">
      <NuxtLink
        v-for="(company, index) in companies"
        :key="index"
        :to="`/empreses/${company.split('.')[0]}`"
      >
        <NuxtImg
          :src="`/images/companies/${company}`"
          :alt="company"
          loading="lazy"
          format="webp"
          class="w-[100px] lg:w-[150px]"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
