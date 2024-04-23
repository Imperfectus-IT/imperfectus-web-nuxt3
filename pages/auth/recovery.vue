<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: ["guest"],
});

defineI18nRoute({
  paths: {
    ca: "/recuperar-contrasenya/",
    es: "/recuperar-password/",
  },
});

const { t } = useI18n();
const i18nHead = useLocaleHead();

useHead({
  title: t("pages.auth.login.title"),
  meta: [
    {
      hid: "description",
      name: "description",
      content: t("pages.auth.login.description"),
    },
    ...i18nHead.value.meta,
  ],
});

const handleRecoveryEvent = () => {
  const localeRoute = useLocaleRoute();
  const route = localeRoute({ name: "admin" });
  navigateTo(route.fullPath);
};
</script>

<template>
  <Divider />
  <main class="page-recovery">
    <div class="page-recovery__wrapper">
      <div class="page-recovery__logo">
        <nuxt-img
          format="webp"
          loading="lazy"
          src="/images/logos/talkual-logo-dark.svg"
          width="280"
          height="50"
          :placeholder="[280, 200, 10]"
          alt="TALKUAL"
        />
      </div>

      <RecoveryForm @recovery="handleRecoveryEvent" />
    </div>
  </main>
</template>
