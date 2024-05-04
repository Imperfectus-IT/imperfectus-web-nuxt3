<template>
  <Header
    class="mt-12 !h-[205px] bg-green-primary lg:mt-0"
    :title="$t('cookies.header')"
    title-class="text-green-tertiary !font-recoleta-medium text-[48px] !leading-[55px]"
    background-color="green-primary"
  />

  <div class="mx-6 font-solina-extended-medium my-10 2xl:max-w-[95vw]">
    <p>{{ $t("cookies.introduction") }}</p>

    <h4 class="text-[28px] whitespace-normal mt-10 mb-4">
      {{ $t("cookies.what.title") }}
    </h4>
    <p>{{ $t("cookies.what.description") }}</p>

    <h4 class="text-[28px] whitespace-normal mt-10 mb-4">
      {{ $t("cookies.types.title") }}
    </h4>
    <div
      v-for="(fragment, index) in listsSections"
      :key="index"
    >
      <p class="my-6">
        {{ $t(`cookies.types.${fragment.fragment}.title`) }}
      </p>
      <ul>
        <ListItem
          v-for="n in fragment.items"
          :key="n"
          main-class="flex gap-x-4 mb-4"
          dot-class="text-[12px]"
          :text="$t(`cookies.types.${fragment.fragment}.item_${n}`)"
        />
      </ul>
    </div>

    <p class="mb-2">
      {{ $t("cookies.types.paragraph_1") }}
    </p>
    <p class="mb-2">
      {{ $t("cookies.types.paragraph_2") }}
    </p>

    <div
      v-for="(tableData, index) in dataForTables"
      :key="index"
    >
      <h4 class="text-[24px] mb-2 mt-6">
        {{ tableData.tableTitle }}
      </h4>
      <DataTable
        :value="tableData.data"
        :lazy="true"
        :unstyled="false"
        class="mx-auto mb-10 flex rounded-lg"
      >
        <Column
          v-for="(column, columnIndex) in tableData.columns"
          :key="columnIndex"
          :header="column.header"
          :field="column.field"
          class="text-left border-b-[1px] p-2 border-[1.5px] border-grey-secondary !max-w-[154px] lg:!min-w-[23vw] xl:!min-w-[23vw] 2xl:!min-w-[21vw]"
          header-class="!bg-green-primary p-2"
        />
      </DataTable>
    </div>
    <div
      v-for="(section, index) in handleSection"
      :key="index"
    >
      <h4 class="text-[28px] mb-4 whitespace-normal leading-9">
        {{ $t(`cookies.${section.fragment}.title`) }}
      </h4>
      <p>{{ $t(`cookies.${section.fragment}.introduction`) }}</p>
      <ul class="mt-4 ml-4">
        <a
          v-for="(n, itemIndex) in section.items"
          :key="itemIndex"
          :href="$t(`cookies.${section.fragment}.item_${n}.to`)"
        >
          <ListItem
            :text="$t(`cookies.${section.fragment}.item_${n}.label`)"
            dot-class="text-[10px] "
            :main-class="'flex gap-x-2 mb-2 text-blue-primary'"
          />
        </a>
      </ul>
      <p
        v-for="(p, paragraphIndex) in section.paragraphs"
        :key="paragraphIndex"
        class="mb-2 last:text-[14px]"
      >
        {{ $t(`cookies.${section.fragment}.paragraph_${p}`) }}
      </p>
    </div>

    <div class="hubspot-banner">
      <p v-if="!isHubspotButtonHidden">
        {{ $t("hubspot.banner.description") }}
      </p>
      <Button
        id="hs_show_banner_button"
        ref="hubspotButton"
        type="button"
        class="mt-6 w-[45%] lg:w-[12%]"
        @click="showBanner"
      >
        {{ $t("hubspot.banner.action") }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineI18nRoute({
  paths: {
    ca: '/politica-de-cookies/',
    es: '/politica-de-cookies/',
  },
})

declare global {
  interface Window {
    _hsp: any
  }
}

const isHubspotButtonHidden = ref<boolean>(false)
const showBanner = () => {
  window._hsp = window._hsp || []
  window._hsp.push(['showBanner'])
}

const tableSections = [
  {
    fragment: 'own_cookies',
    columns: 3,
    items: 4,
  },
  {
    fragment: 'needed_cookies',
    columns: 4,
    items: 15,
  },
  {
    fragment: 'functional_cookies',
    columns: 4,
    items: 11,
  },
  {
    fragment: 'advertising_cookies',
    columns: 4,
    items: 12,
  },
  {
    fragment: 'analysis_cookies',
    columns: 4,
    items: 7,
  },
]

const dataForTables = tableSections.map((section) => {
  const data = []
  for (let i = 1; i <= section.items; i++) {
    data.push({
      name: t(`cookies.types.${section.fragment}.item_${i}.name`),
      purpose: t(`cookies.types.${section.fragment}.item_${i}.purpose`),
      duration: t(`cookies.types.${section.fragment}.item_${i}.duration`),
      entity:
        section.columns === 4
          ? t(`cookies.types.${section.fragment}.item_${i}.entity`)
          : '',
    })
  }
  return {
    tableTitle: t(`cookies.types.${section.fragment}.title`),
    data,
    columns:
      section.columns === 3
        ? [
            { header: t('cookies.types.columns.column_1'), field: 'name' },
            { header: t('cookies.types.columns.column_3'), field: 'purpose' },
            { header: t('cookies.types.columns.column_4'), field: 'duration' },
          ]
        : [
            { header: t('cookies.types.columns.column_1'), field: 'name' },
            { header: t('cookies.types.columns.column_2'), field: 'entity' },
            { header: t('cookies.types.columns.column_3'), field: 'purpose' },
            { header: t('cookies.types.columns.column_4'), field: 'duration' },
          ],
  }
})

const listsSections = [
  {
    fragment: 'who',
    items: 2,
  },
  {
    fragment: 'time',
    items: 2,
  },
  {
    fragment: 'what',
    items: 4,
  },
]

const handleSection = [
  {
    fragment: 'handle',
    items: 6,
    paragraphs: 3,
  },
]
</script>
