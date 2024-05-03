<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  text: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    default: null,
  },
  showDot: {
    type: Boolean,
    default: false,
  },
  isEMail: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <NuxtLink
    v-if="!isEMail"
    :to="localePath(path)"
    class="font-solina-extended-medium text-gray-800 text-sm  flex items-center"
  >
    <span
      v-if="showDot"
      class="content-['x'] inline-block relative h-3 w-3 rounded-full bg-green-primary mr-3"
    />
    {{ text }}
  </NuxtLink>

  <a
    v-else
    :href="`mailto:${path}`"
    target="_blank"
    class="font-solina-extended-medium text-gray-800 text-sm  flex items-center"
  >
    <span
      v-if="showDot"
      class="content-['x'] inline-block relative h-3 w-3 rounded-full bg-green-primary mr-3"
    />
    {{ text }}
  </a>
</template>

<style scoped lang="scss">
//.link {
//  color: $grey-darker;
//  font-size: 15px;
//  font-family: "Solina Extended", serif;
//  display: flex;
//  align-items: center;
//
//  &__dot {
//    content: 'x';
//    display: inline-block;
//    position: relative;
//    height: 12px;
//    width: 12px;
//    border-radius: 50%;
//    background-color: $primary;
//    margin-right: 12px;
//  }
//}
</style>
