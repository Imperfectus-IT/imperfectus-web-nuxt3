<script setup lang="ts">
import type { StrapiUser } from '@nuxtjs/strapi'

defineProps<{
  user: StrapiUser
}>()
</script>

<template>
  <div class="lg:flex lg:flex-row lg:justify-between lg:items-center lg:mr-4">
    <div
      class="font-solina-extended-book mb-14 lg:m-0 lg:flex lg:flex-col lg:justify-center lg:mt-12"
    >
      <h4
        v-if="user"
        class="font-recoleta-regular text-[40px] break-words mb-4 leading-[45px]"
      >
        {{ $t("profile.my_account.title", { name: user.username?.split('@')[0] }) }}
      </h4>
      <p>{{ $t("profile.my_account.help") }}</p>
      <div class="flex flex-row gap-1 mt-1 mb-6">
        <NuxtLink
          class="underline"
          to="https://help.talkualfoods.com/knowledge"
        >
          <span>{{ $t("profile.my_account.link_1") }}</span>
        </NuxtLink>
        <p>o</p>
        <NuxtLink
          class="underline"
          to="contact"
        >
          <span>{{ $t("profile.my_account.link_2") }}</span>
        </NuxtLink>
      </div>
    </div>
    <NuxtLinkLocale :to="{ name: 'order' }">
      <Button
        class="hidden lg:block lg:h-12 lg:w-[200px]"
        :label="$t('string.misc.order')"
      />
    </NuxtLinkLocale>
  </div>
</template>
