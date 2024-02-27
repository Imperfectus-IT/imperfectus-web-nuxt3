
import type divider from '~/presets/talkual-ui/divider';
<template>
  <div class="relative">
    <NuxtImg
      class="w-auto h-[447px] mx-auto object-cover rounded-xl border-[1px] border-green-primary shadow-md"
      :src="basePath + images[`${index}`]"
      loading="lazy"
      format="webp"
      :alt="name"
      @mouseover="index++"
      @mouseout="index--"
    />
 
    <div
      v-if="index === 1" 
      class="text-white-primary w-2/3 text-center absolute left-1/2 -translate-x-1/2 bottom-2">
      <p class="font-recoleta-regular text-[25px]">{{ name }}</p>
      <p class="text-[18px] font-bold">{{ position }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  name: string;
  position: string;
  images: string[];
}>();

const index = ref(0);
const basePath = ref<string>('/images/about/team/')

</script>