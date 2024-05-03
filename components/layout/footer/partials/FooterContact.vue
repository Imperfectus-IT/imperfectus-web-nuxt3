<template>
  <div>
    <h4 class="text-[1.125rem] mb-4 font-extrabold uppercase">
      {{ $t("footerInfo.contact") }}
    </h4>
    <div>
      <NuxtLink
        target="_blank"
        to="mailto:info@talkualfoods.com"
      >info@talkualfoods.com</NuxtLink>
      <br>O
      <NuxtLink
        target="_blank"
        to="contact"
        class="underline"
      >
        {{ $t("footerInfo.contact-here") }}
      </NuxtLink>
    </div>

    <div class="mt-5">
      <p>{{ $t("footerInfo.phone") }}</p>
      <a href="tel:+34722197452">+34 722 19 74 52</a>
    </div>

    <div class="mt-5">
      <p>{{ $t("footerInfo.schedule.1") }}</p>
      <p>{{ $t("footerInfo.schedule.2") }}</p>
    </div>
    <div class="text-[30px] flex flex-row gap-4 mt-6">
      <span
        v-for="icon in socialLinkIcons"
        :key="icon"
        :class="['mdi', `mdi-${icon}`]"
      />
      <a
        class="relative top-3"
        title="Tiktok"
        target="_blank"
        href="https://www.tiktok.com/@talkual"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="24"
          :fill="'hsl(82, 79%, 87%)'"
          viewBox="0 0 16 16"
        >
          <path
            d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const socialLinkIcons = [
  'instagram',
  'linkedin',
  'facebook',
  'youtube',
  'twitter',
]
</script>
