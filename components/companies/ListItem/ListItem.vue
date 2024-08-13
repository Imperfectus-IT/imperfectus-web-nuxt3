<script setup lang="ts">
import type { ListItemTypes } from '~/components/companies/ListItem/ListItemTypes.ts'

withDefaults(defineProps<ListItemTypes>(), {
  text: '',
  textClass: '',
  dotClass: '',
  mainClass: '',
})
</script>

<template>
  <div :class="mainClass ? mainClass : 'flex flex-row items-center gap-x-4' ">
    <div class="flex flex-col min-w-[10px]">
      <span
        :class="dotClass"
        class="text-green-primary min-w-[10px] lg:min-w-[12px] lg:w-[12px] mt-0 "
      >⬤</span>
    </div>
    <p>
      <MDC
        :class="textClass"
        :value="text"
      />
    </p>
  </div>
</template>

<style scoped lang="scss"></style>
