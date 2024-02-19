<template>
  <div class="bg-green-tertiary text-green-quaternary">
    <h4 class="font-extrabold text-[18px] font-solina-extended-book mb-4 ml-2 pt-8 uppercase">
      {{ $t('footerLinks.mission') }}
    </h4>

    <div class="flex flex-col ml-2 leading-9 text-[14px]">
      <NuxtLink
        class=""
        :to="localePath('about')"
      >
        {{ $t('layout.navbar.history') }}
      </NuxtLink>
      <NuxtLink
        class=""
        :to="localePath('farmers')"
      >
        {{ $t('layout.navbar.farmers') }}
      </NuxtLink>
      <NuxtLink
        class=""
        :to="localePath('team')"
      >
        {{ $t('layout.navbar.team') }}
      </NuxtLink>
      <NuxtLink
        class=""
        :to="localePath('food-waste')"
      >
        {{ $t('pages.mission.title') }}
      </NuxtLink>
      <NuxtLink
        class=""
        :to="localePath('commitment')"
      >
        {{ $t('layout.navbar.commitment') }}
      </NuxtLink>
      <NuxtLink
        class=""
        :to="localePath('impact')"
      >
        {{ $t('layout.navbar.impact') }}
      </NuxtLink>
      <NuxtLink
        class=""
        :to="localePath('referafriend')"
      >
        {{ $t('layout.navbar.referrals') }}
      </NuxtLink>
      <NuxtLink
        class=""
        :to="localePath('gift-card-gift-card-create')"
      >
        {{ $t('layout.navbar.giftcards') }}
      </NuxtLink>
    </div>
  </div>
</template>



  
