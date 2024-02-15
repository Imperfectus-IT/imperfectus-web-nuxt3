<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: ["guest"],
});

defineI18nRoute({
  paths: {
    ca: "/iniciar-sessio/",
    es: "/iniciar-sesion/",
  },
});

const handleLoginEvent = () => {
  const localeRoute = useLocaleRoute();
  const route = localeRoute({ name: "admin" });
  navigateTo(route.fullPath);
};
</script>

<template>
  <LoginForm @login="handleLoginEvent">
    <template #header>
      <div class="mb-5 text-center">
        <span class="font-recoleta text-lg font-normal">{{
          $t("loginForm.login")
        }}</span>
      </div>
    </template>
  </LoginForm>
</template>
