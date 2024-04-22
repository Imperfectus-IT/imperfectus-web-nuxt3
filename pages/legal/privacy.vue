<script setup lang="ts">
defineI18nRoute({
  paths: {
    ca: "/politica-de-privacitat/",
    es: "/politica-de-privacidad/",
  }
});
const config = useRuntimeConfig()
const sections = [
  {
    fragment: 'header',
    paragraphs: 2,
    items: [],
  },
  {
    title: true,
    fragment: 'person_in_charge',
    paragraphs: 6,
    items: [],
  },
  {
    title: true,
    fragment: 'data_processing',
    paragraphs: 1,
    items: [],
    table_items: {
      thead: 2,
      tr: 7,
      td: 2,
    },
  },
  {
    title: true,
    fragment: 'data_retention',
    paragraphs: 1,
    items: [],
    table_items: {
      thead: 2,
      tr: 7,
      td: 2,
    },
  },
  {
    title: true,
    fragment: 'data_destination',
    paragraphs: 2,
    items: 4,
  },
  {
    title: true,
    fragment: 'user_rights',
    paragraphs: 2,
    items: 7,
  },
  {
    title: true,
    fragment: 'data_origin',
    paragraphs: 2,
    items: [],
  },
  {
    title: true,
    fragment: 'user_information',
    paragraphs: 4,
    items: [],
  },
  {
    title: true,
    fragment: 'security_measures',
    paragraphs: 2,
    items: [],
  },
  {
    title: true,
    fragment: 'security_issues',
    paragraphs: 1,
    items: [],
  },
  {
    title: true,
    fragment: 'applicable_law',
    paragraphs: 2,
    items: [],
  },
]
</script>

<template>
<section class="mt-14 lg:mt-8">
  <div class="bg-green-primary min-h-[150px] flex justify-center items-center font-recoleta-medium text-[3rem] font-medium text-center leading-10">
    {{ $t('pages.legal.privacy.title') }}
  </div>
  <div class="font-solina-extended-medium px-6 lg:px-[15%] xl:px-[30%]">
    <p class="mt-4">{{ $t("pages.legal.privacy.header.first_paragraph") }} <strong>{{ config.public.baseUrl }}</strong></p>
    <div v-for="(section, index) in sections" :key="index" class="mt-10">
      <h2 v-if="section?.title" class="font-medium text-[2rem] lg:text-[1.75rem]">{{ $t(`pages.legal.privacy.${section.fragment}.title`) }}</h2>
      <p v-for="p in section.paragraphs" :key="p" class="mt-4">{{ $t(`pages.legal.privacy.${section.fragment}.paragraph_${p}`) }}</p>
      <ul v-if="section?.items" class="list-disc ml-8 mt-2">
        <li v-for="n in section?.items" :key="n" class="py-1">{{ $t(`pages.legal.privacy.${section.fragment}.items.item_${n}`) }}</li>
      </ul>
      <table v-if="section?.table_items" class="table-fixed mt-4">
        <thead>
        <tr class="border-b border-green-tertiary/20">
          <th v-for="theadItem in section?.table_items?.thead" :key="theadItem">{{ $t(`pages.legal.privacy.${section.fragment}.table_items.thead_${theadItem}`) }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="trItem in section?.table_items?.tr" :key="trItem" :class="{'border-b border-green-tertiary/20': trItem !== section?.table_items?.tr}">
          <td v-for="tdItem in section?.table_items?.td" :key="tdItem" class="p-2 align-top">{{ $t(`pages.legal.privacy.${section.fragment}.table_items.row_${trItem}_${tdItem}`) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
</template>
