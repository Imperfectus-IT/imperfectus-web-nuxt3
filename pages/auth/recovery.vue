<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

defineI18nRoute({
  paths: {
    ca: '/recuperar-contrasenya/',
    es: '/recuperar-password/',
  },
})

const { t } = useI18n()
const i18nHead = useLocaleHead()

useHead({
  title: t('pages.auth.login.title'),
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: t('pages.auth.login.description'),
    },
    ...i18nHead.value.meta,
  ],
})

const handleRecoveryEvent = () => {
  const localeRoute = useLocaleRoute()
  const route = localeRoute({ name: 'admin' })
  navigateTo(route.fullPath)
}
</script>

<template>
  <Divider />
  <RecoveryForm @recovery="handleRecoveryEvent">
    <template #header>
      <div class="mb-5 lg:mb-10 text-center">
        <span class="font-recoleta-regular text-lg font-normal">
          {{ $t("recoveryForm.recoverPassword") }}
        </span>
      </div>
    </template>
  </RecoveryForm>
</template>
