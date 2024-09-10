<template>
  <SubscriptionEdit
    v-if="subscription"
    :subscription="subscription"
  />
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { useGetSubscriptionsHandler } from '~/composables/admin/subscriptions/get/useGetSubscriptionsHandler.ts'

const { t } = useI18n()
const route = useRoute()
useHead({
  title: t('pages.admin.subscription.title', { subscription: route.params.id }),
})
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

const { subscriptions } = useGetSubscriptionsHandler()
const subscription = ref<Subscription | null>(null)
watch(subscriptions, () => {
  subscription.value = subscriptions.value.find(subscription => subscription?.id === parseInt(route.params.id as string)) as Subscription
})
</script>
