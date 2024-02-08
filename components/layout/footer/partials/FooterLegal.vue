<template>
  <div class="bg-green-tertiary text-green-quaternary">
    <h4 class="font-extrabold text-[18px] font-solina mb-4 ml-2 pt-8 uppercase">
      {{ $t('footerLegal.title') }}
    </h4>

    <div class="flex flex-col leading-9 ml-2 text-[14px]">
      <NuxtLink
        class="has-text-secondary"
        to="legal-conditions"
      >
        {{ $t('pages.legal.conditions.title') }}
      </NuxtLink>

      <NuxtLink
        class="has-text-secondary"
        :to="localePath('legal-privacy')"
      >
        {{ $t('pages.legal.privacy.title') }}
      </NuxtLink>

      <NuxtLink
        class="has-text-secondary"
        :to="localePath('legal-cookies')"
      >
        {{ $t('pages.legal.cookies.title') }}
      </NuxtLink>

      <NuxtLink
        class="has-text-secondary"
        :to="localePath('legal-notice')"
      >
        {{ $t('pages.legal.notice.title') }}
      </NuxtLink>

      <FooterHubspotBanner />
    </div>
  </div>
</template>




