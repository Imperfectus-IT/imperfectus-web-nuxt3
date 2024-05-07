<template>
  subscription

  <div v-for="subscription in subscriptions" >{{subscription}}</div>
</template>

<script setup lang='ts'>
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

defineI18nRoute({
  paths: {
    es: '/mi-cuenta/suscripciones/',
    ca: '/el-meu-compte/subscripcions/',
  },
})

const { subscriptions } = useGetSubscriptionsHandler();
console.log(subscriptions)

</script>