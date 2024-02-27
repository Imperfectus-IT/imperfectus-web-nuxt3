<script setup lang="ts">
const { separator } = withDefaults(defineProps<{
  separator?: boolean
}>(), {
  separator: false
})
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath()
const selectedLocale = computed(() => {
  return locales.value.find(i => i.code === locale.value)
})
</script>

<template>
  <div class="flex gap-x-5 font-semibold uppercase">
    <NuxtLink
        v-for="(currentLocale, index) in locales"
        :key="currentLocale.code"
        :to="switchLocalePath(currentLocale.code)"
        :class="{'opacity-30': selectedLocale?.code.toLowerCase() === currentLocale.code.toLowerCase()}">
      {{ currentLocale.code }}
      <span v-if="separator && index < locales.length - 1" class="ml-3">|</span>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">

</style>
