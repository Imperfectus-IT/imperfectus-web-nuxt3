<template>
  <div class="flex flex-col gap-3">
    <Toolbar>
      <template #center>
        <p>Envío GRATIS a toda la península</p>
      </template>
    </Toolbar>

    <Toolbar class="!p-0 bg-transparent border-none">
      <template #start>
        <Button
          icon="mdi mdi-menu"
          text
          raised
          aria-label="Menu"
          :pt="{ icon: 'text-xl' }"
          @click="visible = true"
        />
      </template>

      <template #center>
        <NuxtLink to="/">
          <TalkualLogoDark
            class="w-[156] h-7"
            :font-controlled="false"
          />
        </NuxtLink>
      </template>

      <template #end>
        <Button
          icon="mdi mdi-account"
          text
          raised
          aria-label="Account"
          :pt="{ icon: 'text-xl' }"
        />
      </template>
    </Toolbar>
    <Sidebar v-model:visible="visible">
      <template #closeicon>
        <span class="mdi mdi-close text-2xl" />
      </template>
      <ul>
        <li
          v-for="item in itemLinks"
          :key="item.label"
          class="mb-3"
        >
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
            <span
              v-if="index !== 0"
              class="mx-3 text-green-primary"
            >|</span>
            <span>{{ currentLocale.code.toUpperCase() }}</span>
          </NuxtLink>
        </li>
      </ul>
    </Sidebar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TalkualLogoDark from '~/assets/images/svg/talkual-logo-dark.svg'

const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const visible = ref(false)
const itemLinks = computed(() => [
  {
    label: t('layout.navbar.boxes'),
    paths: {
      ca: '/les-nostres-caixes',
      es: '/nuestras-cajas',
    },
  },
  {
    label: t('layout.navbar.whatinbox'),
    paths: {
      ca: '/que-hi-ha-a-la-caixa',
      es: '/que-hay-en-la-caja',
    },
  },
  {
    label: t('layout.navbar.fruitsForCompanies'),
    paths: {
      ca: '/empreses',
      es: '/empresas',
    },
  },
  {
    label: t('layout.navbar.referrals'),
    paths: {
      ca: '/convida-un-amic',
      es: '/invita-a-un-amigo',
    },
  },
  {
    label: t('layout.navbar.about'),
    paths: {
      ca: '/historia',
      es: '/historia',
    },
  },
  {
    label: t('layout.navbar.blog.title'),
    paths: {
      ca: 'https://blog.talkualfoods.com/',
      es: 'https://blog.talkualfoods.com/',
    },
  },
])
</script>
