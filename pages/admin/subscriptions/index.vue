<template>
  <div class="flex flex-col lg:flex-grow">
    <div class="lg:flex lg:flex-row lg:justify-between ">
      <h4 class="font-recoleta-regular text-[30px]">
        {{ $t('subscriptions.title') }}
      </h4>
      <NuxtLink>
        <Button
          primary
          class="hidden lg:block "
          :label="$t('subscriptions.add')"
        />
      </NuxtLink>
    </div>
    <Subscription
      v-for="subscription in subscriptions"
      :subscription="subscription"
    />
  </div>
</template>

<script setup lang="ts">
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
