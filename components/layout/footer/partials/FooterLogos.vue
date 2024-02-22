<template>
  <div>
    <h4 class="font-extrabold text-[1.125rem] solina-condensed-bold my-4 lg:my-0 uppercase">
      {{ $t("footer.downloadApp") }}
    </h4>
    <div>
      <NuxtLink>
        <NuxtImg
          class="w-2/3 mt-5"
          src="/images/logos/footer/apple.png"
          loading="lazy"
        />
      </NuxtLink>

      <NuxtLink>
        <NuxtImg
          class="w-2/3 mt-5"
          src="/images/logos/footer/google.png"
          to="https://play.google.com/store/apps/details?id=com.lluraferi.talkual"
          loading="lazy"
        />
      </NuxtLink>
    </div>
  </div>
</template>
