<template>
  <LightNewsRoomSection
      :title="$t('newsroom.contact.title')"
      :description="$t('newsroom.contact.description')"
  >
    <div class="font-light text-base flex justify-center items-center gap-x-5 mt-6">
      <i class="mdi mdi-phone text-2xl"></i>
      <span>+34 722 19 74 52</span>
    </div>
    <div class="font-light text-base flex justify-center items-center gap-x-5 mt-5">
      <i class="mdi mdi-email-outline text-2xl"></i>
      <a class="cursor-pointer" href="mailto:marketing@talkualfoods.com">marketing@talkualfoods.com</a>
    </div>
  </LightNewsRoomSection>
</template>
