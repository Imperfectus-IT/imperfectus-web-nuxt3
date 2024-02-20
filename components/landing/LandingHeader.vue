<template>
  <video
    class="border-2 border-black w-full lg:h-[60vh] lg:object-cover"
    controls
    autoplay
    muted
    loop
    src="/videos/home.m4v?url"
  />
  <h4 class="text-2xl leading-10 text-center mt-16 font-recoleta-medium lg:text-left lg:ml-32">
    {{ $t('homeTitle.title') }}
  </h4>
  <p class="text-center mt-4 lg:text-left lg:ml-32">
    {{ $t('homeTitle.description') }}
  </p>
  <NuxtLink
    class="flex justify-center mt-4"
    to="order"
  >
    <Button
      class=" w-1/2 mx-auto py-4 lg:py-0 lg:w-1/6"
      :label="$t('homeTitle.order')"
      raised
    />
  </NuxtLink>
</template>
