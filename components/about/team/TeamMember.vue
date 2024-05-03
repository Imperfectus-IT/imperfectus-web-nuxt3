import type divider from '~/presets/talkual-ui/divider';
<template>
  <div class="relative my-6 lg:my-0">
    <NuxtImg
      class="mx-auto object-cover rounded-xl border-[1px] border-green-primary shadow-md w-[298px] h-[447px]"
      :src="basePath + images[`${index}`]"
      width="298px"
      height="500px"
      loading="lazy"
      format="webp"
      :alt="name"
      @mouseover="index++"
      @mouseout="index--"
    />

    <div
      v-if="index === 1"
      class="text-white-primary w-full text-center absolute left-1/2 -translate-x-1/2 bottom-2"
    >
      <p class="font-recoleta-regular text-[25px]">
        {{ name }}
      </p>
      <p class="text-[18px] font-bold">
        {{ position }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  position: string
  images: string[]
}>()

const index = ref(0)
const basePath = ref<string>('/images/about/team/')
</script>
