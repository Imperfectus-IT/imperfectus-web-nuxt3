<script setup lang="ts">
defineProps<{
  googleLabel: string
}>()
const googleConnectUrl = `${useRuntimeConfig().public.STRAPI_URL}/connect/google`

const handleClick = () => {
  window.location.href = googleConnectUrl
}
</script>

<template>
  <div class="flex justify-center">
    <GoogleLoginButton
      :label="googleLabel"
      @click="handleClick"
    />
  </div>
</template>
