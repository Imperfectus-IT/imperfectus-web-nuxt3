<template>
    <div class="bg-green-tertiary text-green-quaternary text-center text-[20px] w-11/12 mx-auto">
      <NuxtImg
        loading="lazy"
        format="webp"
        :src="image"
        alt="Refer a friend" 
        class="w-full mb-8"
      />
      <p class="font-bold">{{ title }}</p>
      <p class="mt-3 leading-6 p-2">{{ description }}</p>
    </div>
</template>

<script setup lang="ts">

defineProps<ReferCardType>()

interface ReferCardType {
  title: string;
  description: string;
  image: string;
}



</script>