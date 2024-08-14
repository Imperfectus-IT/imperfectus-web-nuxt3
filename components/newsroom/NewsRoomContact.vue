<template>
  <LightNewsRoomSection
    :title="$t('newsroom.contact.title')"
    :description="$t('newsroom.contact.description')"
  >
    <div class="font-light text-base flex justify-center items-center gap-x-5 mt-6">
      <NuxtImg
        class="w-[30px]"
        format="webp"
        loading="lazy"
        alt="email_icon"
        src="/images/newsroom/phone_icon.webp"
      />
      <span>
        +34 722 19 74 52</span>
    </div>
    <div class="font-light text-base flex justify-center items-center gap-x-5 mt-5">
      <NuxtImg
        class="w-[30px]"
        format="webp"
        loading="lazy"
        alt="email_icon"
        src="/images/newsroom/email_icon.webp"
      />
      <a
        class="cursor-pointer"
        href="mailto:marketing@talkualfoods.com"
      >marketing@talkualfoods.com</a>
    </div>
  </LightNewsRoomSection>
</template>

<script setup lang="ts">
</script>
