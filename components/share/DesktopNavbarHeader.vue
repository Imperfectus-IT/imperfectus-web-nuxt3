<script setup lang="ts">
import TalkualLogoDark from "~/assets/images/svg/talkual-logo-dark.svg";

const {t} = useI18n();
const localePath = useLocalePath();
const {visible, toggleVisible} = useVisibleSidebar();
const items = ref([
  {
    label: t("layout.navbar.menu"),
    command: () => {
      toggleVisible()
    }
  },
  {
    label: t("layout.navbar.boxes"),
    items: [
      {
        label: t("layout.navbar.boxes.boxes"),
        url: localePath("boxes")
      },
      {
        label: t("layout.navbar.boxes.special"),
        url: localePath("special")
      },
    ]
  },
  {
    label: t("layout.navbar.boxes.companies"),
    url: localePath("companies")
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
        <div class="flex items-center justify-center gap-x-5 mr-4">
          <NuxtLink :to="localePath({ name: 'order' })">
            <Button :label="$t('homeTitle.order')" raised/>
          </NuxtLink>
          <NuxtLink to="/">
            <Button
                :label="$t('layout.navbar.account')"
                icon="mdi mdi-account"
                icon-pos="right"
                link
                :pt="{ label: { class: 'font-solina-extended-medium font-normal' }, icon: { class: 'text-lg ml-2 order-1' } }"
            />
          </NuxtLink>
          <TKLocalesSwitcher class="flex" :separator="true"/>
        </div>
      </template>
    </Toolbar>
    <AppSidebar v-model:visible="visible" @hide="toggleVisible"/>
  </section>
</template>
