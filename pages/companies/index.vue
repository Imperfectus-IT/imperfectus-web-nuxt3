<script setup lang="ts">
import Link from "~/components/share/Link.vue";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineI18nRoute({
  paths: {
    ca: "/empreses/",
    es: "/empresas/",
  },
});

const pdfFilePath = computed(() => {
  return `/pdfs/${t("pages.companies.pdfFileName")}`;
});

const loading = ref(false);
const validationsActive = ref(false);
const marketingInfoComm = ref(false);
const talkualLegalBasis = ref(false);
const showErrorTermsAndConditions = ref(false);
const isMessageSent = ref(false);

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

const images = ref([
  {
    image: "/images/companies/caja_de_fruta.webp",
    alt: "Companies.5.alt",
  },
  {
    image: "/images/companies/ISPROX.jpg",
    alt: "Companies.6.alt",
  },
  {
    image: "/images/companies/juices.jpg",
    alt: "Companies.7.alt",
  },
  {
    image: "/images/companies/MAPFRE.jpg",
    alt: "Companies.8.alt",
  },
  {
    image: "/images/companies/zumos-talkual-15.jpg",
    alt: "Companies.9.alt",
  },
]);
const reasons = reactive([
  {
    title: "companies.why.1.title",
    description: "companies.why.1.description",
  },
  {
    title: "companies.why.2.title",
    description: "companies.why.2.description",
  },
  {
    title: "companies.why.3.title",
    description: "companies.why.3.description",
  },
  {
    title: "companies.why.4.title",
    description: "companies.why.4.description",
  },
  {
    title: "companies.why.5.title",
    description: "companies.why.5.description",
  },
  {
    title: "companies.why.6.title",
    description: "companies.why.6.description",
  },
]);
// const form = this.getFormInitData();
// const validations = this.getValidationsInitData();
// const fullForm = ref(false);

const scrollIntoView = (id: string) => {
  console.info("scrollIntoView:", id);
};
</script>
<template>
  <div class="bg-[#fffae8] font-serif flex flex-col">
    <Header
      :title="
        $t('companies.wantBeHealthy.1') + '\n' + $t('companies.wantBeHealthy.2')
      "
      background-color="#b79f85"
      background-desktop="/images/companies/header.jpg"
    />

    <Container
      class="flex flex-col gap-0 pr-4 pb-12 pl-4 lg:flex-row lg:gap-12"
    >
      <div class="flex flex-col text-lg lg:max-w-[50%] lg:mt-[5px] lg:text-xl">
        <SectionTitle
          :is-title-h1="true"
          :value="$t('companies.title')"
          class="mt-12 mb-6"
          title-class="mb-4"
        />

        <p
          class="h-full mb-[35px] font-solina-extended-book text-[20px] leading-[30px] lg:text-[28px] lg:leading-[42px]"
        >
          {{ $t("companies.description") }}
        </p>

        <h3 @click="scrollIntoView('reasons')">
          <Link :text="$t('companies.whoItWorks')" :show-dot="true" />
        </h3>
      </div>

      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] ml-[15px] bg-green-primary lg:h-full"
      />

      <div class="flex flex-col text-lg lg:max-w-[50%] lg:mt-[5px] lg:text-xl">
        <SectionTitle
          class="mt-12 mb-6"
          is-title-h2
          :value="$t('companies.lgd.title')"
          title-class="mb-4"
        />

        <p
          class="h-full mb-[35px] font-solina-extended-book text-[20px] leading-[30px] lg:text-[28px] lg:leading-[42px]"
        >
          {{ $t("companies.lgd.description.1") }}
          <strong>{{ $t("companies.lgd.description.2.bold") }}</strong>
          {{ $t("companies.lgd.description.3") }}
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
      class="flex flex-col gap-y-12 py-12 bg-gray-secondary text-green-quaternary md:grid md:grid-cols-1 md:gap-x-5 md:gap-y-24 md:px-10 md:py-20 lg:grid-cols-2"
    >
      <div class="flex flex-col items-center m-[5px] md:flex-row">
        <div class="ml-auto flex w-full justify-center md:w-[200px]">
          <NuxtImg
            class="object-scale-down h-[200px] lg:h-[140px]"
            format="webp"
            loading="lazy"
            src="/images/companies/proximity.webp"
            :alt="$t('Companies.1.alt')"
          />
        </div>
        <span
          class="mr-auto w-full pr-2 pl-2 text-center text-[24px] leading-[1.35] font-solina-extended-book mt-[18px] md:w-[300px] md:mt-0 md:pr-0 md:pl-10 md:text-left lg:w-[250px]"
        >
          {{ $t("companies.reasons.proximity") }}
        </span>
      </div>

      <div class="flex flex-col items-center m-[5px] md:flex-row">
        <div class="ml-auto flex w-full justify-center md:w-[200px]">
          <NuxtImg
            format="webp"
            loading="lazy"
            class="object-scale-down h-[200px] lg:h-[140px]"
            src="/images/companies/healthy.webp"
            :alt="$t('Companies.2.alt')"
          />
        </div>
        <span
          class="mr-auto w-full pr-2 pl-2 text-center text-[24px] leading-[1.35] font-solina-extended-book mt-[18px] md:w-[300px] md:mt-0 md:pr-0 md:pl-10 md:text-left lg:w-[250px]"
        >
          {{ $t("companies.reasons.healthy") }}
        </span>
      </div>

      <div class="flex flex-col items-center m-[5px] md:flex-row">
        <div class="ml-auto flex w-full justify-center md:w-[200px]">
          <NuxtImg
            format="webp"
            loading="lazy"
            class="object-scale-down h-[200px] lg:h-[140px]"
            src="/images/companies/no-waste.webp"
            :alt="$t('Companies.3.alt')"
          />
        </div>
        <span
          class="mr-auto w-full pr-2 pl-2 text-center text-[24px] leading-[1.35] font-solina-extended-book mt-[18px] md:w-[300px] md:mt-0 md:pr-0 md:pl-10 md:text-left lg:w-[250px]"
        >
          {{ $t("companies.reasons.no-waste") }}
        </span>
      </div>

      <div class="flex flex-col items-center m-[5px] md:flex-row">
        <div class="ml-auto flex w-full justify-center md:w-[200px]">
          <NuxtImg
            format="webp"
            loading="lazy"
            class="object-scale-down h-[200px] lg:h-[140px]"
            src="/images/companies/solutions.webp"
            :alt="$t('Companies.4.alt')"
          />
        </div>
        <span
          class="mr-auto w-full pr-2 pl-2 text-center text-[24px] leading-[1.35] font-solina-extended-book mt-[18px] md:w-[300px] md:mt-0 md:pr-0 md:pl-10 md:text-left lg:w-[250px]"
        >
          {{ $t("companies.reasons.solutions") }}
        </span>
      </div>
    </div>

    <div class="mt-0 mr-0 mb-0 ml-0 flex flex-col md:flex-row">
      <div
        class="flex w-full flex-col justify-center pb-[30px] mt-[15px] pl-[5%] pr-[5%] md:mt-0 md:w-1/2 md:pb-0"
      >
        <h2 class="text-2xl font-recoleta-regular mt-[15px] md:mt-0">
          {{ $t("companies.box.title") }}
        </h2>

        <div class="text-[25px] mt-[15px] mb-[5px]">
          <span class="block text-[20px] font-solina-extended-book">
            {{ $t("companies.box.description") }}
          </span>

          <ul class="list-none mt-[15px]">
            <li
              class="font-solina-extended-book text-[20px] flex items-center before:content-['⬤'] before:text-green-primary before:inline-block before:w-4 before:mr-5 before:text-[14px] before:text-primary before:font-bold"
            >
              <span>{{ $t("companies.box.description.s") }}</span>
            </li>
            <li
              class="font-solina-extended-book text-[20px] flex items-center before:content-['⬤'] before:text-green-primary before:inline-block before:w-4 before:mr-5 before:text-[14px] before:text-primary before:font-bold"
            >
              <span>{{ $t("companies.box.description.m") }}</span>
            </li>
            <li
              class="font-solina-extended-book text-[20px] flex items-center before:content-['⬤'] before:text-green-primary before:inline-block before:w-4 before:mr-5 before:text-[14px] before:text-primary before:font-bold"
            >
              <span>{{ $t("companies.box.description.xl") }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full p-0 md:w-1/2">
        <TKCarousel
          :data="images"
          :num-scroll="1"
          carousel-class="h-[400px] lg:h-[620px]"
          image-class="w-full object-cover h-[400px] lg:h-[620px]"
        />
      </div>
    </div>

    <div class="flex flex-col items-center pt-12 pb-12 bg-green-quaternary">
      <h2 class="text-center leading-none font-recoleta-regular text-[40px]">
        {{ $t("companies.knowMore") }}
      </h2>

      <span
        class="mt-6 mb-6 w-full text-center font-solina-extended-book md:w-[400px]"
      >
        {{ $t("companies.pdfDescription") }}
      </span>

      <h3>
        <a :href="pdfFilePath" :download="$t('pages.companies.pdfFileName')">
          <Button
            class="w-[240px] font-solina-extended-book md:w-[400px]"
            :label="$t('companies.downloadPdf')"
          />
        </a>
      </h3>
    </div>
  </div>
</template>
