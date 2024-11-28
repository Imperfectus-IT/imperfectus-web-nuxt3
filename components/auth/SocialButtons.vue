<script setup lang="ts">
defineProps<{
  googleLabel: string
}>()
const googleConnectUrl = `${useRuntimeConfig().public.STRAPI_URL}/api/connect/google`

const handleClick = () => {
  window.location.href = googleConnectUrl
}

console.log(useRuntimeConfig().public.baseUrl)
</script>

<template>
  <div class="flex justify-center">
    <!--    <NuxtLink :to="googleConnectUrl"> -->
    <GoogleLoginButton
      :label="googleLabel"
      @click="handleClick"
    />
    <!--    </NuxtLink> -->
  </div>
</template>
