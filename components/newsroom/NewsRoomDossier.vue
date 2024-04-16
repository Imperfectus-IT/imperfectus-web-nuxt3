<template>
  <LightNewsRoomSection
      :title="$t('newsroom.dossier.title')"
      :description="$t('newsroom.dossier.description')">
    <NuxtLink to="https://drive.google.com/file/d/1RuzOmpGbA3O0EHlNLHdo-ArUlVhfMTK8/view?usp=drive_link" target="_blank" rel="noopener">
      <Button :label="$t('newsroom.dossier.downloadButtonText')" outlined small class="uppercase mt-8 !p-2">
        <i class="mdi mdi-tray-arrow-down text-xl"></i>
        <span class="px-3">{{ $t('newsroom.dossier.downloadButtonText') }}</span>
      </Button>
    </NuxtLink>
  </LightNewsRoomSection>
</template>
