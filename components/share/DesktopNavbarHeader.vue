<script setup lang="ts">
import TalkualLogoDark from "~/assets/images/svg/talkual-logo-dark.svg";
import { ref, computed } from "vue";

const { t, locale, locales } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const visible = ref(false);
const itemLinks = computed(() => [
  {
    id: useId(),
    label: t("layout.navbar.boxes"),
    paths: {
      ca: "/les-nostres-caixes",
      es: "/nuestras-cajas",
    },
    children: [
      {
        id: useId(),
        label: t("layout.navbar.boxes"),
        paths: {
          ca: "/les-nostres-caixes",
          es: "/nuestras-cajas",
        },
      },
    ],
  },
  {
    id: useId(),
    label: t("layout.navbar.whatinbox"),
    paths: {
      ca: "/que-hi-ha-a-la-caixa",
      es: "/que-hay-en-la-caja",
    },
  },
  {
    id: useId(),
    label: t("layout.navbar.fruitsForCompanies"),
    paths: {
      ca: "/empreses",
      es: "/empresas",
    },
  },
  {
    id: useId(),
    label: t("layout.navbar.referrals"),
    paths: {
      ca: "/convida-un-amic",
      es: "/invita-a-un-amigo",
    },
  },
  {
    id: useId(),
    label: t("layout.navbar.about"),
    paths: {
      ca: "/historia",
      es: "/historia",
    },
  },
  {
    id: useId(),
    label: t("layout.navbar.blog.title"),
    paths: {
      ca: "https://blog.talkualfoods.com/",
      es: "https://blog.talkualfoods.com/",
    },
  },
]);
</script>

<template>
  <section>
    <Toolbar class="!p-0 bg-transparent border-none">
      <template #start>
        <div class="flex px-4">
          <NuxtLink class="text-[1.125rem] font-medium leading-5" to="/">
            <span class="uppercase">{{ $t("layout.navbar.menu") }}</span>
          </NuxtLink>
        </div>
      </template>

      <template #center>
        <NuxtLink to="/">
          <TalkualLogoDark class="w-[156] h-7" :font-controlled="false" />
        </NuxtLink>
      </template>

      <template #end>
        <div class="flex items-center justify-center gap-x-2">
          <NuxtLink to="/">
            <span class="uppercase">{{ $t("navbarAdmin.myAccount") }}</span>
          </NuxtLink>
          <span>|</span>
          <Button
              icon="mdi mdi-shopping"
              text
              raised
              aria-label="Account"
              :pt="{ icon: 'text-xl' }"
          />
        </div>
      </template>
    </Toolbar>
    <Sidebar v-model:visible="visible">
      <template #closeicon>
        <span class="mdi mdi-close text-2xl" />
      </template>
      <ul>
        <li v-for="item in itemLinks" :key="item.id" class="mb-3">
          <NuxtLink :to="item.paths[locale]">
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
      <ul class="mt-14 text-lg">
        <li>
          <NuxtLink
            v-for="(currentLocale, index) in locales"
            :key="currentLocale.code"
            :to="switchLocalePath(currentLocale.code)"
            active-class="text-white"
          >
            <span v-if="index !== 0" class="mx-3 text-green-primary">|</span>
            <span>{{ currentLocale.code.toUpperCase() }}</span>
          </NuxtLink>
        </li>
      </ul>
    </Sidebar>
  </section>
</template>

<style scoped lang="scss"></style>
