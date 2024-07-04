<script setup lang="ts">
defineProps<{
  googleLabel: string
}>()
const googleConnectUrl = `${useRuntimeConfig().public.STRAPI_URL}/connect/google`
</script>

<template>
  <div class="flex justify-center">
    <NuxtLink :to="googleConnectUrl">
      <GoogleLoginButton :label="googleLabel" />
    </NuxtLink>
  </div>
</template>
