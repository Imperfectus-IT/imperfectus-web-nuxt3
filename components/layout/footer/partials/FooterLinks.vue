<template>
  <div class=" bg-green-tertiary text-green-quaternary">
    <h4 class="font-extrabold text-[18px] font-solina-extended-book mb-4 ml-2 pt-8">
      {{ $t('string.misc.talkual') }}
    </h4>
    <div class="flex flex-col leading-9 ml-2 text-[14px]">
      <NuxtLink
        :to="('boxes')"
      >
        {{ $t('footerLinks.boxes') }}
      </NuxtLink>
      <NuxtLink
        :to="('boxes')"
      >
        {{ $t('footerLinks.deliver') }}
      </NuxtLink>
      <NuxtLink
        :to="('companies')"
      >
        {{ $t('footerLinks.companies') }}
      </NuxtLink>
      <NuxtLink
        :to="('companies')"
      >
        {{ $t('footerLinks.offices') }}
      </NuxtLink>
      <a
        href="https://blog.talkualfoods.com/tag/beneficios-y-propiedades"
      >
        {{ $t('footerLinks.benefits') }}
      </a>
      <a
        :href="$t('layout.navbar.blog.url')"
        target="_blank"
      >
        {{ $t('layout.navbar.blog.title') }}
      </a>

      <a
        :href="$t('layout.navbar.faqs.url')"
        target="_blank"
      >
        {{ $t('layout.navbar.faqs.title') }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>