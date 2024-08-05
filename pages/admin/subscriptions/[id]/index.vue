<template>
  <SubscriptionEdit
    v-if="subscription"
    :subscription="subscription"
  />
</template>

<script setup lang='ts'>
defineI18nRoute({
  paths: {
    ca: '/el-meu-compte/subscripcions/[id]',
    es: '/mi-cuenta/suscripciones/[id]',
  },
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const route = useRoute()
const { subscriptions } = useSubscriptionsState()
const subscription = subscriptions.value.filter((subscription: Subscription) => subscription.id === parseInt(route.params.id))[0]
</script>
