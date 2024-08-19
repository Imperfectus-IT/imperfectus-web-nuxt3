<script setup lang="ts">
import TalkualLogoDark from '~/assets/images/svg/talkual-logo-dark.svg'

const { t } = useI18n()
const localePath = useLocalePath()
const { visible, toggleVisible } = useVisibleSidebar()

const items = ref([
  {
    label: t('layout.navbar.menu'),
    command: () => {
      toggleVisible()
    },
  },
])
</script>

<template>
  <section>
    <Toolbar
      class="px-7 bg-transparent border-[1px] border-green-tertiary border-t-0 border-x-0 gap-x-2 lg:h-[69px]"
    >
      <template #start>
        <Menubar :model="items" />
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
        <div class="flex items-center justify-center pr-8">
          <NuxtLink :to="localePath({ name: 'admin' })">
            <Button
              :label="$t('layout.navbar.account')"
              link
              :pt="{
                label: { class: 'font-solina-extended-medium font-normal' },
              }"
            />
          </NuxtLink>
        </div>
      </template>
    </Toolbar>
    <AppAdminSidebar
      v-model:visible="visible"
      @hide="toggleVisible"
    />
  </section>
</template>
