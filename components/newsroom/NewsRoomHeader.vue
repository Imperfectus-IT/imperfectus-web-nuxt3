<template>
  <section class="mt-14 mb-10 lg:my-5 lg:mb-5">
    <Divider/>
    <div class="text-center px-5 text-green-tertiary lg:flex lg:flex-cols-2 lg:justify-between lg:items-center lg:px-20 lg:py-10 xl:px-96">
      <div class="lg:w-[760px] xl:w-[560px]">
        <h3 class="font-recoleta-regular text-2xl font-normal lg:text-[5rem]">{{ $t('newsroom.header.title') }}</h3>
        <p class="font-light text-base mt-4 lg:mt-8 lg:text-[1.3rem] lg:leading-8">{{ $t('newsroom.header.description') }}</p>
      </div>
      <NuxtImg
          class="mt-8 lg:mt-0 lg:w-[640px]"
          src="/images/newsroom/oficina_talkual.webp"
          alt="Oficina de Talkual"
          width="350"
          height="225"
          sizes="350px lg:640px"
          :placeholder="[350, 225]"
          preload
      />
    </div>
  </section>
</template>
