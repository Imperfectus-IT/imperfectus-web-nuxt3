<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})

defineI18nRoute({
  paths: {
    ca: '/iniciar-sessio/',
    es: '/iniciar-sesion/',
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

const {
  REGISTER_EVENT,
  LOGIN_EVENT,
  componentRender,
  loadComponent,
  handleLoginEvent,
  handleRegisterEvent,
} = useAuth()
</script>

<template>
  <LoginForm
    v-if="componentRender === LOGIN_EVENT"
    class="mt-8"
    @login="handleLoginEvent"
    @auth-form-requested="loadComponent"
  />
  <RegisterForm
    v-if="componentRender === REGISTER_EVENT"
    class="mt-8"
    @user-registered="handleRegisterEvent"
    @auth-form-requested="loadComponent"
  />
</template>
