
<template>
  <div class="flex flex-col gap-3">
    <Toolbar>
      <template #center>
        <p>Envío GRATIS a toda la península</p>
      </template>
    </Toolbar>

    <Toolbar class="!p-0 bg-transparent border-none">
      <template #start>
        <Button icon="mdi mdi-menu" text raised aria-label="Menu" :pt="{ icon: 'text-xl' }" @click="visible = true" />
      </template>

      <template #center>
        <NuxtLink to="/">
          <TalkualLogoDark class="w-[156] h-7" :font-controlled="false" />
        </NuxtLink>
      </template>

      <template #end>
        <Button icon="mdi mdi-account" text raised aria-label="Account" :pt="{ icon: 'text-xl' }" />
      </template>
    </Toolbar>
    <Sidebar v-model:visible="visible">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.</p>
    </Sidebar>
  </div>
</template>
<script setup lang="ts">
import TalkualLogoDark from '~/assets/images/svg/talkual-logo-dark.svg'
import { ref } from "vue";

const visible = ref(false);
</script>
