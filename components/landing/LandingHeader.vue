<template>
  <video
    class="border-2 border-black w-full lg:h-[70vh] lg:object-cover lg:rounded-xl lg:w-auto lg:mx-6 "
    controls
    autoplay
    muted
    loop
    src="/videos/home.m4v?url"
  />
   <div class="lg:flex lg:flex-row lg:justify-between lg:mt-16 relative right-20">
    <div class="lg:flex lg:flex-col">
      <h4 class="text-2xl leading-10 text-center mt-16 font-recoleta-medium lg:text-left lg:ml-32 lg:mt-0  lg:text-[60px]">
          {{ $t('homeTitle.title') }}
      </h4>
      <p class="text-center mt-4 lg:text-left lg:ml-36">
        {{ $t('homeTitle.description') }}
      </p>
    </div>

    <div class="flex justify-end">
      <NuxtLink
        class="mt-4 lg:mt-0"
        to="order"
      >
        <Button
          class="w-1/2 mx-auto py-4 lg:w-full lg:px-10"
          :label="$t('homeTitle.order')"
          raised
        />
      </NuxtLink>
    </div>
  </div>
</template>
