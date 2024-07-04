<template>
  <SubscriptionEdit
    v-if="subscription"
    :subscription="subscription"
  />
</template>

<script setup lang='ts'>
import { useGetSubscriptionsHandler } from '~/composables/admin/subscriptions/get/useGetSubscriptionsHandler.ts'

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
const { subscriptions } = useGetSubscriptionsHandler()
const subscription = ref<Subscription | null>(null)
watch(subscriptions, () => {
  subscription.value = subscriptions.value.find(subscription => subscription?.id === parseInt(route.params.id as string)) as Subscription
})
</script>
