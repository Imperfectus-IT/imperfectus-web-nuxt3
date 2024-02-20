<script setup lang="ts">
import { computed } from "vue";

const { t } = useI18n();
const freeShippingLabel = computed(() => {
  const smallBreakpoint = 1024;
  const currentWidth = window?.screen?.width;
  console.log(currentWidth);

  return currentWidth <= smallBreakpoint
    ? t("string.misc.freeShipping-mobile")
    : t("string.misc.freeShipping");
});
</script>
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Toolbar class="p-0">
    <template #center>
      <span class="text-xs">{{ freeShippingLabel }}</span>
    </template>
  </Toolbar>
</template>
