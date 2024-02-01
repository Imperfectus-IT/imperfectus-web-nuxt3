<template>
  <video
    class="border-2 border-black"
    controls
    autoplay
    muted
    loop
    src="/videos/home.m4v?url"
  />
  <h4 class="text-2xl leading-10 text-center mt-4 font-recoleta">
    {{ $t('homeTitle.title') }}
  </h4>
  <p class="text-center mt-4">
    {{ $t('homeTitle.description') }}
  </p>
  <NuxtLink
    class="flex justify-center mt-4 "
    to="order"
  >
    <Button
      class=" w-1/2 !mx-auto !py-4"
      :label="$t('homeTitle.order')"
      raised
    />
  </NuxtLink>
</template>