<script setup lang="ts">
import TalkualLogoDark from "assets/images/svg/talkual-logo-dark.svg";
</script>

<template>
  <section>
    <Toolbar class="h-[62px] p-0 pb-1 content-end">
      <template
        #center
      >
        <span class="text-xs">
          Envío GRATIS a toda la península
        </span>
      </template>
    </Toolbar>
    <div class="flex justify-center my-8">
      <NuxtLink to="/">
        <TalkualLogoDark
          class="w-auto h-10"
          :font-controlled="false"
        />
      </NuxtLink>
    </div>
    <div class="container mx-auto">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>
