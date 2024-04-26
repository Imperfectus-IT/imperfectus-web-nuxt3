<script setup lang='ts'>
import type { StrapiUser } from '@nuxtjs/strapi';

defineProps<{
  user: StrapiUser
}>();
</script>

<template>
  <div class="font-solina-extended-book m-6 mb-14">
    <h4 v-if="user" class="font-recoleta-regular text-[40px] break-words mb-4">
      {{ $t("profile.my_acount.title", { name: user.username }) }}
    </h4>
    <p>{{ $t("profile.my_acount.help") }}</p>
    <div class="flex flex-row gap-1 mt-1 mb-6">
      <NuxtLink class="underline" to="https://help.talkualfoods.com/knowledge">
        <span>{{ $t("profile.my_acount.link_1") }}</span>
      </NuxtLink>
      <p>o</p>
      <NuxtLink class="underline" to="contact">
        <span>{{ $t("profile.my_acount.link_2") }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
