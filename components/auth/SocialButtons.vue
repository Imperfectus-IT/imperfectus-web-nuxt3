<script setup lang="ts">
defineProps<{
  googleLabel: string
}>()
const googleConnectUrl = `${useRuntimeConfig().public.baseUrl}/api/connect/google`

console.log(useRuntimeConfig().public.baseUrl)
</script>

<template>
  <div class="flex justify-center">
    <NuxtLink :to="googleConnectUrl">
      <GoogleLoginButton :label="googleLabel" />
    </NuxtLink>
  </div>
</template>
