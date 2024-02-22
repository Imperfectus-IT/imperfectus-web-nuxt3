<script setup lang="ts">
const logoItems = [
  {
    id: useId(),
    src: "/images/logos/footer/logo1.png",
    alt: "logo1"
  },
  {
    id: useId(),
    src: "/images/logos/footer/logo2.png",
    alt: "logo2"
  },
  {
    id: useId(),
    src: "/images/logos/footer/logo3.png",
    alt: "logo3"
  }
]
</script>
<template>
  <div class="bg-green-primary text-green-tertiary pt-2 lg:flex lg:justify-around lg:items-center lg:h-24">
    <h4 class="text-[30px] font-recoleta-regular text-center lg:text-2xl">
      {{ $t("footerLegal.claim") }}
    </h4>
    <div class="text-center mt-2">
      <span class="mr-2">{{ new Date().getFullYear() }} TALKUAL. </span>
      <span>All rights reserved.</span>
    </div>
    <div class="bg-green-primary flex items-center gap-5 p-4 lg:justify-center">
      <NuxtImg v-for ="logo in logoItems" :key="logo.id" :src="logo.src" :alt="logo.alt" width="120"/>
    </div>
  </div>
</template>
