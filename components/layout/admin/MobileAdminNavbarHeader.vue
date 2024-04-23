<script setup lang="ts">
import TalkualLogoDark from "~/assets/images/svg/talkual-logo-dark.svg";

const localePath = useLocalePath();
const { visible, toggleVisible } = useVisibleSidebar();
const router = useRouter();
const routeToHidde = {
  "auth-login___es": true,
  "auth-login___ca": true,
};
const hiddeAccountLink = computed(
  () => routeToHidde[router.currentRoute.value.name as string] ?? false
);


</script>

<template>
  <section class="border-b-[1px]">
    <Toolbar class="px-4 bg-transparent border-none">
      <template #start>
        <NuxtLink to="/">
          <TalkualLogoDark class="w-[156] h-8" :font-controlled="false" />
        </NuxtLink>
      </template>
      <template #end>
        <Button
          icon="mdi mdi-menu"
          text
          raised
          aria-label="Menu"
          :pt="{ icon: 'text-2xl' }"
          @click="toggleVisible"
        />
      </template>
    </Toolbar>
    <SideMenu v-if="visible" v-model:hidden="visible" @hide="toggleVisible" />
  </section>
</template>

<style scoped lang="scss"></style>
