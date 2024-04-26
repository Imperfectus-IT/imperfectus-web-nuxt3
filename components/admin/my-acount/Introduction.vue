<script setup lang="ts">
import type { StrapiUser } from "@nuxtjs/strapi";

defineProps<{
  user: StrapiUser;
}>();
</script>

<template>
  <div class="lg:flex lg:flex-row lg:justify-between lg:items-center lg:mr-4">
    <div
      class="font-solina-extended-book m-6 mb-14 lg:m-0 lg:flex lg:flex-col lg:justify-center lg:mt-12"
    >
      <h4
        v-if="user"
        class="font-recoleta-regular text-[40px] break-words mb-4 leading-[45px]"
      >
        {{ $t("profile.my_acount.title", { name: user.username }) }}
      </h4>
      <p>{{ $t("profile.my_acount.help") }}</p>
      <div class="flex flex-row gap-1 mt-1 mb-6">
        <NuxtLink
          class="underline"
          to="https://help.talkualfoods.com/knowledge"
        >
          <span>{{ $t("profile.my_acount.link_1") }}</span>
        </NuxtLink>
        <p>o</p>
        <NuxtLink class="underline" to="contact">
          <span>{{ $t("profile.my_acount.link_2") }}</span>
        </NuxtLink>
      </div>
    </div>
    <NuxtLink to="order" >
      <Button
        class="hidden lg:block lg:h-12 lg:w-[200px]"
        :label="$t('string.misc.order')"
      />
    </NuxtLink>
  </div>
</template>

