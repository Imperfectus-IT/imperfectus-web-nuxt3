<script setup lang="ts">
const companies = [
  { image: 'alohas.webp', link: 'https://alohas.com/' },
  { image: 'alsa.webp', link: 'https://www.alsa.es/' },
  { image: 'chep.webp', link: 'https://www.chep.com/' },
  { image: 'cooltra.webp', link: 'https://cooltra.com/' },
  { image: 'decathlon.webp', link: 'https://www.decathlon.es/' },
  { image: 'hannlin.webp', link: 'https://hanlinltd.com/' },
  { image: 'ilerna.webp', link: 'https://www.ilerna.es/' },
  { image: 'innovamat.webp', link: 'https://www.innovamat.com/' },
  { image: 'mail-boxes.webp', link: 'https://www.mbe.es/' },
  { image: 'motor-tarrega.webp', link: 'https://motortarrega.com/' },
  { image: 'nomad-coffee.webp', link: 'https://nomadcoffee.es/' },
  { image: 'oriols.webp', link: 'https://www.maderasobiols.com/' },
]
</script>

<template>
  <div
    class="pl-4 pr-4 py-[30px] md:flex md:flex-col md:self-center md:p-8"
  >
    <SectionTitle
      :value="$t('companies.healthy.title')"
      class="text-xl lg:text-[36px]"
      title-class="mb-10"
    />

    <div class="grid grid-cols-3 lg:flex lg:flex-wrap lg:items-center lg:justify-start gap-x-10 gap-y-10 lg:w-1/2 lg:mx-auto">
      <a
        v-for="(company, index) in companies"
        :key="index"
        :href="company.link"
      >
        <NuxtImg
          :src="`/images/companies/${company.image}`"
          :alt="company.image"
          loading="lazy"
          format="webp"
          class="w-[100px] lg:w-[150px]"
        />
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
