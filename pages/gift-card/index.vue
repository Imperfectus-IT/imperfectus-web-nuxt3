<script setup lang="ts">
const { t } = useI18n()
defineI18nRoute({
  paths: {
    es: '/tarjeta-regalo-digital/crear',
    ca: '/targeta-regal-digital/crear',
  },
})

useHead({
  title: t('gift-card-create.title'),
  meta: [
    {
      name: 'description',
      content: t('git-card-create.description'),
    },
  ],
})

const componentToRenderFromStep: Record<string, any> = {
  [CREATE_STEP]: resolveComponent('CreateGiftCardStep'),
  [BILLING_STEP]: resolveComponent('BillingGiftCardStep'),
}

const executeStep = () => console.log('')
</script>

<template>
  <section>
    <component
      :is="componentToRenderFromStep[CREATE_STEP]"
      @go-to-step="executeStep"
    />
  </section>
</template>
