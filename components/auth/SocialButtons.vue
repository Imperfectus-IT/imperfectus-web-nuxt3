<script setup lang="ts">
const googleConnectUrl = `${useRuntimeConfig().public.STRAPI_URL}/connect/google`
</script>

<template>
  <div class="flex justify-center">
    <NuxtLink :to="googleConnectUrl">
      <GoogleLoginButton />
    </NuxtLink>
  </div>
</template>
