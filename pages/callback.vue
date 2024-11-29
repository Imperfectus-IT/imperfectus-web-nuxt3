<script lang="ts" setup>
const { code, authuser, scope, hd, prompt } = useRoute().query
const config = useRuntimeConfig()
onMounted(async () => {
  await $fetch(`${config.public.STRAPI_URL}/connect/google/callback/`, {
    params: {
      code,
      scope,
      authuser,
      hd,
      prompt,
    },
  })
})
</script>

<template>
  <div>
    <h1>Callback</h1>
  </div>
</template>
