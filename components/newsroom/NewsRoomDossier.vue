<template>
  <LightNewsRoomSection
    :title="$t('newsroom.dossier.title')"
    :description="$t('newsroom.dossier.description')"
  >
    <a
      :href="`/pdfs/news_room_${locale}.pdf`"
      target="_blank"
      rel="noopener"
    >
      <Button
        :label="$t('newsroom.dossier.downloadButtonText')"
        outlined
        small
        class="uppercase mt-8 !p-2"
      >
        <i class="mdi mdi-tray-arrow-down text-xl" />
        <span class="px-3">{{ $t('newsroom.dossier.downloadButtonText') }}</span>
      </Button>
    </a>
  </LightNewsRoomSection>
</template>

<script setup lang="ts">
const { locale } = useI18n()
</script>
