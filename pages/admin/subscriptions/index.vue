<template>
  <div class="flex flex-col lg:flex-grow">
    <div class="lg:flex lg:flex-row lg:justify-between ">
      <h4 class="font-recoleta-regular text-[30px]">
        {{ $t('subscriptions.title') }}
      </h4>
      <NuxtLinkLocale to="order">
        <Button
          primary
          class="hidden lg:block "
          :label="$t('subscriptions.add')"
        />
      </NuxtLinkLocale>
    </div>
    <Subscription
      v-for="subscription in subscriptions"
      :subscription="subscription"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
useHead({
  title: t('pages.admin.subscriptions.title'),
})
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

const { subscriptions } = useGetSubscriptionsHandler()
</script>
