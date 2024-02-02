<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-col">
    <div>
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
    </div>

    <LandingHeader />
    <XDivider /> <!-- Se le puede pasar el color -->
    <LandingBoxesCarousel />
    <LandingVegetablesCarousel />      <!-- FALTA SWAP AUTOMÁTICO -->
    <LandingOffer />
    <LandingProducts />
    <LandingUpToDate />
    <LandingBlog />
    <LandingWorldData />
  </div>
</template>

<script setup lang="ts">
import TalkualLogoDark from '~/assets/images/svg/talkual-logo-dark.svg'

</script>

<style scoped lang="scss">

</style>
