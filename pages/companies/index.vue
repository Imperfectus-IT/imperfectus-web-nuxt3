<script setup lang="ts">
import Link from "~/components/share/Link.vue";
import { useI18n } from "vue-i18n";
import { useScroll } from "~/composables/scroll/scroll.ts";

defineI18nRoute({
  paths: {
    ca: "/empreses/",
    es: "/empresas/",
  },
});

const { t } = useI18n();
const { scrollToById } = useScroll();
const i18nHead = useLocaleHead();

useHead({
  title: t("pages.companies.title"),
  meta: [
    {
      hid: "description",
      name: "description",
      content: t("pages.companies.description"),
    },
    ...i18nHead.value.meta,
  ],
});

const pdfFilePath = computed(() => {
  return `/pdfs/${t("pages.companies.pdfFileName")}`;
});
</script>
<template>
  <div class="bg-[#fffae8] font-serif flex flex-col pb-[80px]">
    <Header
      :title="
        $t('companies.wantBeHealthy.1') + '\n' + $t('companies.wantBeHealthy.2')
      "
      class="h-[222px]"
      background-color="#b79f85"
      background-desktop="/images/companies/header.webp"
    >
      <template #action>
        <Button
          class="mt-5"
          :label="$t('companies.getYourFreeBox')"
          path="/contacte"
        />
      </template>
    </Header>

    <Container
      class="flex flex-col gap-0 pr-4 pb-12 pl-4 lg:flex-row lg:gap-12"
    >
      <div
        class="flex flex-col items-center text-lg lg:max-w-[50%] lg:mt-[5px] lg:text-xl"
      >
        <SectionTitle
          :is-title-h1="true"
          :value="$t('companies.mission')"
          class="mt-12"
          title-class="mb-4 font-solina-extended-medium"
        />

        <p
          class="h-full mb-[35px] font-recoleta-regular text-[20px] leading-[30px] lg:text-[28px] lg:leading-[42px]"
        >
          {{ $t("companies.description") }}
        </p>

        <InfoCard
          class="mb-5"
          :title="$t('companies.mission.1.title')"
          :description="$t('companies.mission.1.description')"
        />

        <InfoCard
          :title="$t('companies.mission.2.title')"
          :description="$t('companies.mission.2.description')"
        />

        <NuxtImg
          class="mt-5"
          width="290"
          src="/images/companies/no-waste.webp"
          alt="No waste"
        />

        <p class="mt-5 text-lg font-recoleta-regular">
          {{ $t("companies.mission.join") }}
        </p>
      </div>
    </Container>

    <div
      class="flex flex-col items-center pt-14 pr-4 pb-10 pl-4 bg-gray-secondary text-green-quaternary md:grid md:grid-cols-2 md:gap-x-5 md:px-10 md:py-20"
    >
      <div class="flex justify-center md:row-start-1 md:row-end-3">
        <NuxtImg
          class="object-scale-down h-[200px] md:h-[300px]"
          format="webp"
          loading="lazy"
          src="/images/companies/make-order.webp"
          :alt="$t('Companies.1.alt')"
        />
      </div>

      <span
        class="mt-8 pr-2 pl-2 text-lg leading-[1.35] font-recoleta-regular md:text-[40px] md:mt-0 md:pr-0 md:text-left"
      >
        {{ $t("companies.whatYouGet.title") }}
      </span>

      <ul
        class="mt-8 mr-0 text-beige-primary md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3"
      >
        <li class="mb-4">
          <ListItem
            :text="$t('companies.whatYouGet.1')"
            text-class="flex-1 font-solina-extended-medium"
          />
        </li>

        <li class="mb-4">
          <ListItem
            :text="$t('companies.whatYouGet.2')"
            text-class="flex-1 font-solina-extended-medium"
          />
        </li>

        <li class="mb-4">
          <ListItem
            :text="$t('companies.whatYouGet.3')"
            text-class="flex-1 font-solina-extended-medium"
          />
        </li>

        <li>
          <ListItem
            :text="$t('companies.whatYouGet.4')"
            text-class="flex-1 font-solina-extended-medium"
          />
        </li>
      </ul>
    </div>

    <div
      class="mt-0 mr-0 mb-0 ml-0 flex flex-col pt-6 pr-4 pb-6 pl-4 md:pl-[50px] md:pr-[50px] md:grid md:grid-cols-2 md:grid-rows-4 md:content-center md:gap-y-5 md:pt-20 md:pb-20"
    >
      <SectionTitle
        :value="$t('companies.whoItWorks.title')"
        class="mb-2 md:mb-0"
        title-class="mb-4 text-lg md:text-[40px] md:mb-0"
      />

      <ListItem
        :text="$t('companies.whoItWorks.1')"
        class="gap-x-2 md:col-start-1"
        text-class="flex-1 text-base font-solina-extended-book md:text-[26px]"
      />

      <div class="mt-5 flex gap-4 md:col-start-2 md:row-start-2 md:m-0">
        <InfoCard :title="$t('string.day.tuesday')" class="flex-1" />
        <InfoCard :title="$t('string.day.wednesday')" class="flex-1" />
        <InfoCard :title="$t('string.day.thursday')" class="flex-1" />
      </div>

      <ListItem
        :text="$t('companies.frequency.title')"
        class="mt-6 gap-x-2 md:mt-0"
        text-class="flex-1 text-base font-solina-extended-book md:text-[26px]"
      />

      <div
        class="mt-5 flex flex-wrap gap-4 md:col-start-2 md:row-start-3 md:m-0"
      >
        <InfoCard :title="$t('companies.frequency.weekly')" class="md:flex-1" />
        <InfoCard
          :title="$t('companies.frequency.biweekly')"
          class="md:flex-1"
        />
        <InfoCard :title="$t('companies.frequency.once')" class="md:flex-1" />
      </div>

      <ListItem
        :text="$t('companies.size')"
        class="mt-6 gap-x-2 md:mt-0"
        text-class="flex-1 text-base font-solina-extended-book md:text-[26px]"
      />
    </div>

    <CompaniesOffer />

    <HealthyCompanies />

    <!--
Remove
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
    </div>-->

    <div
      id="request-box-form"
      class="mt-12 block self-center text-center md:w-[650px] md:pr-0 md:pl-0"
    >
      <div class="pl-[15px] pr-[15px]">
        <h2
          class="text-center leading-none font-recoleta-regular text-[40px] mb-[18px]"
        >
          {{ $t("pages.companies.form.title") }}
        </h2>

        <span class="mb-6 block text-center font-solina-extended-book">
          {{ $t("pages.companies.form.description") }}
        </span>

        <span class="mb-6 block text-center font-solina-extended-book">
          {{ $t("pages.companies.form.availableFor") }}
        </span>

        <small
          class="block italic font-solina-extended-book text-[14px] mb-[20px]"
        >
          {{ $t("pages.companies.all-required") }}
        </small>
      </div>

      <HubSpotForm form="b2b" />
    </div>
  </div>
</template>
