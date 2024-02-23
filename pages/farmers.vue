<template>
   

<div>
  <Header :title="t('farmers.header.title')" :description="t('farmers.header.description')" background-desktop="'/images/farmers/header.jpg'" />
  <Container>
    <div class="flex flex-col w-1/2 space-y-4">
    <p class="font-solina-condensed text-lg">{{ t('farmers.title') }}</p>
    <p class="font-extralight text-[26px]">{{ t('farmers.description') }}</p>
  </div>
  </Container>
</div>
   
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineI18nRoute({
  paths: {
    ca: "/agricultors/",
    es: "/agricultores/",
  },
});

</script>