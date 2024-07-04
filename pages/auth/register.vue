<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

defineI18nRoute({
  paths: {
    ca: '/registrar-usuario/',
    es: '/registrar-usuari/',
  },
})
const { t } = useI18n()
const i18nHead = useLocaleHead()

useHead({
  title: t('pages.auth.register.title'),
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: t('pages.auth.register.description'),
    },
    ...i18nHead.value.meta,
  ],
})

const handleRegisterEvent = () => {
  const localeRoute = useLocaleRoute()
  const route = localeRoute({ name: 'admin' })
  navigateTo(route.fullPath)
}
</script>

<template>
  <Divider />
  <RegisterForm
    class="mt-8"
    @user-registered="handleRegisterEvent"
  />
</template>
