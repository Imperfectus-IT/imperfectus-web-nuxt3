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
  <div class="grid grid-cols-1 lg:grid-cols-3 bg-green-primary text-green-tertiary pt-2 lg:justify-around lg:items-center lg:h-24">
    <div class="order-2 lg:order-1 text-center mt-2">
      <span class="mr-2">{{ new Date().getFullYear() }} TALKUAL. </span>
      <span>All rights reserved.</span>
    </div>
    <h4 class="order-1 lg:order-2 text-[30px] font-recoleta-regular text-center lg:text-2xl">
      {{ $t("footerLegal.claim") }}
    </h4>
    <div class="order-3 bg-green-primary flex items-center gap-5 p-4 lg:justify-center">
      <NuxtImg v-for ="logo in logoItems" :key="logo.id" :src="logo.src" :alt="logo.alt" width="120" loading="lazy" format="webp" />
    </div>
  </div>
</template>
