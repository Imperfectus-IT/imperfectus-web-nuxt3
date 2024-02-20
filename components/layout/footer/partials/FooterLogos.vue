<template>
  <div>
    <h4 class="font-extrabold text-lg !solina-condensed my-4 uppercase">
      {{ $t("footer.downloadApp") }}
    </h4>
    <div>
      <NuxtLink>
        <NuxtImg
          class="w-2/5 mt-5"
          src="/images/logos/footer/apple.png"
          loading="lazy"
        />
      </NuxtLink>

      <NuxtLink>
        <NuxtImg
          class="w-2/5 mt-5"
          src="/images/logos/footer/google.png"
          to="https://play.google.com/store/apps/details?id=com.lluraferi.talkual"
          loading="lazy"
        />
      </NuxtLink>
    </div>

    <div class="py-8 mt-6">
      <NuxtLink to="/">
        <TalkualLogoLight class="h-15 w-full" :font-controlled="false" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import TalkualLogoLight from "~/assets/images/svg/talkual-logo-light.svg";
</script>
