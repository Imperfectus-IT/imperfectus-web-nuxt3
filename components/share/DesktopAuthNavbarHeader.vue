<script setup lang="ts">
import TalkualLogoDark from "~/assets/images/svg/talkual-logo-dark.svg";

const {t} = useI18n();
const {visible, toggleVisible} = useVisibleSidebar();
const items = ref([
  {
    label: t("layout.navbar.menu"),
    command: () => {
      toggleVisible()
    }
  }
]);
</script>
<template>
  <section>
    <Toolbar class="!p-0 bg-transparent border-none gap-x-2 lg:h-[69px]">
      <template #start>
        <Menubar :model="items"/>
      </template>
      <template #center>
        <NuxtLink to="/">
          <TalkualLogoDark class="w-[156] h-7" :font-controlled="false"/>
        </NuxtLink>
      </template>
      <template #end>
        <div class="flex items-center justify-center gap-x-5 pr-8">
          <TKLocalesSwitcher class="flex" :separator="true"/>
        </div>
      </template>
    </Toolbar>
    <AppSidebar v-model:visible="visible" @hide="toggleVisible"/>
  </section>
</template>
