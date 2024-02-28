<script setup lang="ts">
const companies = [
  "alohas.webp",
  "alsa.webp",
  "chep.webp",
  "cooltra.webp",
  "decathlon.webp",
  "hannlin.webp",
  "ilerna.webp",
  "innovamat.webp",
  "mail-boxes.webp",
  "motor-tarrega.webp",
  "nomad-coffee.webp",
  "oriols.webp",
  "ondara.webp",
];
</script>

<template>
  <div class="p-8">
    <SectionTitle
      :value="$t('companies.healthy.title')"
      class="text-lg"
      title-class="mb-10"
    />

    <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-8">
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
          width="100"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
