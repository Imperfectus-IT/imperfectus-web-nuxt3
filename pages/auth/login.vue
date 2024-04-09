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
const {t} = useI18n();
const i18nHead = useLocaleHead();

useHead({
    title: t('pages.auth.login.title'),
    meta: [
        {
            hid: 'description',
            name: 'description',
            content: t('pages.auth.login.description')
        },
        ...i18nHead.value.meta
    ]
});

const handleLoginEvent = () => {
    const localeRoute = useLocaleRoute();
    const route = localeRoute({name: "admin"});
    navigateTo(route.fullPath);
};
</script>

<template>
    <Divider />
    <LoginForm class="mt-8" @login="handleLoginEvent">
        <template #header>
            <div class="mb-5 lg:mb-10 text-center">
        <span class="font-recoleta text-lg font-normal">{{
                $t("loginForm.login")
            }}</span>
            </div>
        </template>
    </LoginForm>
</template>
