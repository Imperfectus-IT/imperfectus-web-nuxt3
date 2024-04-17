<template>
  <footer class="mt-28">
    <section class="bg-green-tertiary">
      <TKTopFooterEffect />
      <div class="flex text-green-quaternary px-8 lg:mt-10 lg:justify-between">
        <div class="lg:flex lg:justify-between lg:gap-8 xl:px-[10%] 2xl:gap-4 2xl:basis-full 2xl:px-[5%]">
          <FooterLinks />
          <FooterContact />
          <FooterLogos />
          <TKLocalesSwitcher class="hidden lg:flex"/>
        </div>
        <TKLocalesSwitcher class="lg:hidden" />
      </div>
      <div class="text-center my-10 px-8 lg:px-20 xl:px-10">
        <NuxtLink to="/">
          <TalkualLogoLight :font-controlled="false" />
        </NuxtLink>
      </div>
      <FooterRights />
    </section>
  </footer>
</template>

<script setup lang="ts">
import TalkualLogoLight from "assets/images/svg/talkual-logo-light.svg";
</script>
