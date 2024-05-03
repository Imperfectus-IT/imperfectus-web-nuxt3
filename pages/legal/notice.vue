<script setup lang="ts">
defineI18nRoute({
  paths: {
    ca: '/avis-legal/',
    es: '/aviso-legal/',
  },
})

const sections = [
  {
    fragment: 'owner',
    paragraphs: 1,
    items: 5,
  },
  {
    fragment: 'object',
    paragraphs: 3,
  },
  {
    fragment: 'responsibility',
    paragraphs: 1,
  },
  {
    fragment: 'ip_address',
    paragraphs: 2,
  },
  {
    fragment: 'link_policies',
    paragraphs: 3,
  },
  {
    fragment: 'data_privacy',
    paragraphs: 2,
  },
  {
    fragment: 'intellectual_property',
    paragraphs: 8,
  },
  {
    fragment: 'ssl',
    paragraphs: 3,
  },
]
</script>

<template>
  <section class="mt-14 lg:mt-8">
    <div
      class="bg-green-primary min-h-[150px] flex justify-center items-center font-recoleta-medium text-[3rem] font-medium"
    >
      {{ $t('pages.legal.notice.title') }}
    </div>
    <div class="font-solina-extended-medium px-6 lg:px-[23%] xl:px-[30%]">
      <div
        v-for="(section, index) in sections"
        :key="index"
        class="mt-10"
      >
        <h2 class="font-medium text-[2rem]">
          {{ $t(`pages.legal.notice.${section.fragment}.title`) }}
        </h2>
        <p
          v-for="p in section.paragraphs"
          :key="p"
          class="mt-4"
        >
          {{ $t(`pages.legal.notice.${section.fragment}.paragraph_${p}`) }}
        </p>
        <ul
          v-if="section.items"
          class="list-disc ml-8 mt-2"
        >
          <li
            v-for="n in section.items"
            :key="n"
            class="py-1"
          >
            {{ $t(`pages.legal.notice.owner.items.item_${n}`) }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
