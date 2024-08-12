<template>
  <div>
    <h4 class="font-extrabold text-[1.125rem] solina-condensed-bold my-4 lg:my-0 uppercase">
      {{ $t("footer.downloadApp") }}
    </h4>
    <div>
      <a href="https://apps.apple.com/es/app/talkual/id6469320546">
        <NuxtImg
          class="w-[156px] h-[52px] lg:mt-5"
          src="/images/logos/footer/apple.webp"
          format="webp"
          loading="lazy"
        />
      </a>

      <a href="https://play.google.com/store/apps/details?id=com.lluraferi.talkual">
        <NuxtImg
          class="mt-5 w-[156px] h-[52px]"
          src="/images/logos/footer/google.webp"
          loading="lazy"
          format="webp"
        />
      </a>
    </div>
  </div>
</template>
