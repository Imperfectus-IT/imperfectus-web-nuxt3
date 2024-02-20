<script setup lang="ts">
import { ref, reactive } from 'vue';
import Link from '~/components/share/Link.vue';

defineI18nRoute({
  paths: {
    ca: '/empreses/',
    es: '/empresas/'
  }
});



const loading = ref(false);
const validationsActive = ref(false);
const marketingInfoComm = ref(false);
const talkualLegalBasis = ref(false);
const showErrorTermsAndConditions = ref(false);
const isMessageSent = ref(false);
const images = reactive([
  {
    src: '/images/companies/caja_de_fruta.webp',
    alt: 'Companies.5.alt'
  },
  {
    src: '/images/companies/ISPROX.jpg',
    alt: 'Companies.6.alt'
  },
  {
    src: '/images/companies/juices.jpg',
    alt: 'Companies.7.alt'
  },
  {
    src: '/images/companies/MAPFRE.jpg',
    alt: 'Companies.8.alt'
  },
  {
    src: '/images/companies/zumos-talkual-15.jpg',
    alt: 'Companies.9.alt'
  }
]);
const reasons = reactive([
  {
    title: 'companies.why.1.title',
    description: 'companies.why.1.description'
  },
  {
    title: 'companies.why.2.title',
    description: 'companies.why.2.description'
  },
  {
    title: 'companies.why.3.title',
    description: 'companies.why.3.description'
  },
  {
    title: 'companies.why.4.title',
    description: 'companies.why.4.description'
  },
  {
    title: 'companies.why.5.title',
    description: 'companies.why.5.description'
  },
  {
    title: 'companies.why.6.title',
    description: 'companies.why.6.description'
  }
]);
// const form = this.getFormInitData();
// const validations = this.getValidationsInitData();
// const fullForm = ref(false);

const scrollIntoView = (id: string) => {
  console.info('scrollIntoView:', id);
}
</script>
<template>
  <div class="bg-[#fffae8] font-serif pb-[125px] flex flex-col">
    <Header
      :title="$t('companies.wantBeHealthy.1') + '\n' + $t('companies.wantBeHealthy.2')"
      background-color="#b79f85"
      background-desktop="/images/companies/header.jpg"
    />

    <Container class="flex flex-col gap-0 pl-4 pr-4 pb-12 lg:flex-row lg:gap-12">
      <div
        class="flex flex-col text-lg lg:text-xl lg:max-w-[50%] lg:mt-[5px]"
      >
        <SectionTitle
          :is-title-h1="true"
          :value="$t('companies.title')"
          class="mt-12 mb-6"
          title-class="mb-4"
        />

        <p class="mb-[35px] font-solina-extended-book text-[20px] leading-[30px] lg:text-[28px] lg:leading-[42px]">
          {{ $t('companies.description') }}
        </p>

        <h3 @click="scrollIntoView('reasons')">
          <Link
            :text="$t('companies.whoItWorks')"
            :show-dot="true"
          />
        </h3>
      </div>

      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] ml-[15px] bg-green-primary lg:h-full" />

      <div class="flex flex-col text-lg lg:text-xl lg:max-w-[50%] lg:mt-[5px]">
        <SectionTitle
          class="mt-12 mb-6"
          is-title-h2
          :value="$t('companies.lgd.title')"
          title-class="mb-4"
        />

        <p class="mb-[35px] font-solina-extended-book text-[20px] leading-[30px] lg:text-[28px] lg:leading-[42px]">
          {{ $t('companies.lgd.description.1') }}
          <strong>{{ $t('companies.lgd.description.2.bold') }}</strong>
          {{ $t('companies.lgd.description.3') }}
        </p>

        <h3>
          <Link
            :text="$t('companies.lgd.ask')"
            path="empresa@talkualfoods.com"
            :show-dot="true"
            :is-e-mail="true"
          />
        </h3>
      </div>
    </Container>

    <div
      id="reasons"
      class="bg-gray-secondary text-green-quaternary flex flex-col py-12 gap-y-12 md:grid md:grid-cols-1 md:gap-x-5 md:gap-y-24 md:px-10 md:py-20 lg:grid-cols-2"
    >
      <div class="flex flex-col items-center m-[5px] md:flex-row">
        <div class="ml-auto flex justify-center w-full md:w-[200px]">
          <NuxtImg
            class="h-[200px] object-scale-down lg:h-[140px]"
            format="webp"
            loading="lazy"
            src="/images/companies/proximity.webp"
            :alt="$t('Companies.1.alt')"
          />
        </div>
        <span class="text-[24px] leading-[1.35] font-solina-extended-book mr-auto text-center w-full mt-[18px] pl-2 pr-2 md:w-[300px] md:text-left md:mt-0 md:pl-10 md:pr-0 lg:w-[250px]">
          {{ $t('companies.reasons.proximity') }}
        </span>
      </div>

      <div class="flex flex-col items-center m-[5px] md:flex-row">
        <div class="ml-auto flex justify-center w-full md:w-[200px]">
          <NuxtImg
            format="webp"
            loading="lazy"
            class="h-[200px] object-scale-down lg:h-[140px]"
            src="/images/companies/healthy.webp"
            :alt="$t('Companies.2.alt')"
          />
        </div>
        <span class="text-[24px] leading-[1.35] font-solina-extended-book mr-auto text-center w-full mt-[18px] pl-2 pr-2 md:w-[300px] md:text-left md:mt-0 md:pl-10 md:pr-0 lg:w-[250px]">
          {{ $t('companies.reasons.healthy') }}
        </span>
      </div>

      <div class="flex flex-col items-center m-[5px] md:flex-row">
        <div class="ml-auto flex justify-center w-full md:w-[200px]">
          <NuxtImg
            format="webp"
            loading="lazy"
            class="h-[200px] object-scale-down lg:h-[140px]"
            src="/images/companies/no-waste.webp"
            :alt="$t('Companies.3.alt')"
          />
        </div>
        <span class="text-[24px] leading-[1.35] font-solina-extended-book mr-auto text-center w-full mt-[18px] pl-2 pr-2 md:w-[300px] md:text-left md:mt-0 md:pl-10 md:pr-0 lg:w-[250px]">
          {{ $t('companies.reasons.no-waste') }}
        </span>
      </div>

      <div class="flex flex-col items-center m-[5px] md:flex-row">
        <div class="ml-auto flex justify-center w-full md:w-[200px]">
          <NuxtImg
            format="webp"
            loading="lazy"
            class="h-[200px] object-scale-down lg:h-[140px]"
            src="/images/companies/solutions.webp"
            :alt="$t('Companies.4.alt')"
          />
        </div>
        <span class="text-[24px] leading-[1.35] font-solina-extended-book mr-auto text-center w-full mt-[18px] pl-2 pr-2 md:w-[300px] md:text-left md:mt-0 md:pl-10 md:pr-0 lg:w-[250px]">
          {{ $t('companies.reasons.solutions') }}
        </span>
      </div>
    </div>

    <div class="flex flex-col mt-0 mb-0 ml-0 mr-0">
      <div class="flex flex-col justify-center w-full md:w-1/2">
        <h2 class="text-2xl">
          {{ $t('companies.box.title') }}
        </h2>

        <div class="mt-4">
          <span>{{ $t('companies.box.description') }}</span>
          <ul class="list-disc list-inside">
            <li>
              <span>{{ $t('companies.box.description.s') }}</span>
            </li>
            <li>
              <span>{{ $t('companies.box.description.m') }}</span>
            </li>
            <li>
              <span>{{ $t('companies.box.description.xl') }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full md:w-1/2 p-0">
        <!--<b-carousel
          :arrow-hover="false"
          :autoplay="false"
          icon-size="is-medium"
        >
          <b-carousel-item
            v-for="(image, index) in images"
            :key="index"
          >
            <nuxt-img
              format="webp"
              loading="lazy"
              :src="image.src"
              :alt="image.alt"
            />
          </b-carousel-item>
        </b-carousel>-->

        <Carousel
          :value="images"
          :num-visible="1"
          :num-scroll="1"
        >
          <template #item="item">
            <pre>item: {{ JSON.stringify(item, null, 2) }}</pre>
            <!--            <NuxtImg
              loading="lazy"
              :src="item.src"
              :alt="$t(item.alt)"
            />-->
          </template>
        </Carousel>
      </div>
    </div>
  </div>
</template>

