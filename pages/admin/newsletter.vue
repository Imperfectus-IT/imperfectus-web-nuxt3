<template>
  <Newsletter :user="user" />
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

const { user } = useGetUserHandler()
</script>
