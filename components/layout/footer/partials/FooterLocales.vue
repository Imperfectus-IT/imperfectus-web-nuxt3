<script setup lang="ts">
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath()
const selectedLocale = computed(() => {
  return locales.value.find(i => i.code === locale.value)
})
</script>

<template>
  <div class="flex gap-x-5 font-semibold uppercase">
    <NuxtLink
        v-for="currentLocale in locales"
        :key="currentLocale.code"
        :to="switchLocalePath(currentLocale.code)"
        :class="{'opacity-30': selectedLocale?.code.toLowerCase() === currentLocale.code.toLowerCase()}">
      {{ currentLocale.code }}
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">

</style>
