<script setup lang="ts">
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
