<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-col">
    <Toolbar>
      <template #center>
        <p>Envío GRATIS a toda la península</p>
      </template>
    </Toolbar>

    <Toolbar class="!p-0 bg-transparent border-none mt-2">
      <template #start>
        <Button
          icon="mdi mdi-menu"
          text
          raised
          aria-label="Menu"
          :pt="{ icon: 'text-xl' }"
        />
      </template>

      <template #center>
        <NuxtLink to="/">
          <TalkualLogoDark
            class="w-[156] h-7"
            :font-controlled="false"
          />
        </NuxtLink>
      </template>

      <template #end>
        <Button
          icon="mdi mdi-account"
          text
          raised
          aria-label="Account"
          :pt="{ icon: 'text-xl' }"
        />
      </template>
    </Toolbar>
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
    <NuxtLink to="/boxes">
      <Button
        class=" w-1/2 ml-auto mr-auto mt-4 !py-4"
        :label="$t('homeTitle.order')"
        raised
      />
    </NuxtLink>

    <hr class="mt-4 border-t-2">



    <!-- BOXES -->
    <div>
      <p class="my-10 text-left text-[30px] mx-10">
        {{ $t('homeBoxes.description') }}
      </p>
      <ul class="is-flex !font-solina font-bold ">
        <li class="dot">
          <Nuxt-link :to="localePath('boxes')">
            {{ $t('homeBoxes.howToWorks') }}
          </Nuxt-link>
        </li>
      </ul>
    </div>

    <div class="flex items-center justify-center bg-red-primary mt-10">
      <Card>
        <template #header>
          <img
            alt="user header"
            src="https://res.cloudinary.com/talkual/image/upload/v1686833239/Caixa_S_1_ad68acddfa.webp"
            class="rounded-t-[30px]"
          >
          <hr>
        </template>
        <template #title>
          <div class="text-[20px] font-light">
            {{ $t('content.home.ourBoxes.item0.title') }}
          </div>
        </template>
        <template #content>
          <p class="!p-0">
            {{ $t('content.home.ourBoxes.item0.description') }}
          </p>
        </template>
        <template #footer>
          <Button
            class="w-full !ml-0 rounded-t-[0px] rounded-b-[15px]"
            :label="$t('homeBoxes.buy')"
            severity="secondary"
          />
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import TalkualLogoDark from '~/assets/images/svg/talkual-logo-dark.svg'

const localePath = useLocalePath();
</script>

<style scoped lang="scss">
.dot {
    position: relative;
    &::after {
      background: red!important;
      content: '';
      display: block;
      width: 15px;
      height: 15px;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%) translateX(-25px);
      border-radius: 50%;
      // background-color: $primary;
    }
  }
</style>
