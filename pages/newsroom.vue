<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
useHead({
  title: t('newsroom.meta.title'),
  meta: [
    {
      name: 'description',
      content: t('newsroom.meta.description'),
    },
  ],
})
defineI18nRoute({
  paths: {
    ca: '/sala-de-premsa/',
    es: '/sala-de-prensa/',
  },
})
</script>

<template>
  <NewsRoomHeader />
  <NewsRoomArtwork />
  <NewsRoomMedia />
  <hr class="bg-green-tertiary w-3/4 lg:w-4/5 mx-auto lg:mt-5">
  <NewsRoomDossier />
  <NewsRoomSocialNetworks />
  <NewsRoomContact />
</template>
