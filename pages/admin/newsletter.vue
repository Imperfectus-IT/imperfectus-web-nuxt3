<template>
  <Newsletter :user="domainUser" />
</template>

<script setup lang="ts">
defineI18nRoute({
  paths: {
    ca: '/el-meu-compte/newsletter',
    es: '/mi-cuenta/newsletter',
  },
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { domainUser, handleGetDomainUser } = useGetUserHandler()
onMounted(async () => {
  await handleGetDomainUser()
})
</script>
