<template>
  <video
    class="border-2 border-black w-full lg:h-[65vh] lg:object-cover lg:rounded-xl lg:w-auto lg:mx-6 lg:mt-10"
    controls
    autoplay
    muted
    loop
    src="/videos/home.m4v"
  />
   <div class="-mt-9 lg:flex lg:flex-row lg:justify-between lg:mt-16 lg:relative lg:right-20">
    <div class="lg:flex lg:flex-col">
      <h4 class="text-2xl leading-10 text-center mt-16 font-recoleta-medium lg:text-left lg:ml-48 lg:mt-0  lg:text-[60px]">
          {{ $t('homeTitle.title') }}
      </h4>
      <p class="text-center mt-8 lg:text-left lg:ml-[212px]">
        {{ $t('homeTitle.description') }}
      </p>
    </div>

    <div class="flex justify-center lg:justify-end">
      <NuxtLink
        class="mt-4 lg:mt-0"
      >
        <Button
          class="p-10 lg:py-4 w-full lg:px-10 lg:mt-0"
          :label="$t('homeTitle.order')"
          raised
        />
      </NuxtLink>
    </div>
  </div>
</template>
