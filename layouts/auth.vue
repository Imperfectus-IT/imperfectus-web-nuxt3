<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import TalkualLogoDark from "assets/images/svg/talkual-logo-dark.svg";
</script>

<template>
  <section>
    <TopToolbar class="h-[62px] pb-1 content-end" />
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

<style scoped lang="scss"></style>

<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import TalkualLogoDark from "assets/images/svg/talkual-logo-dark.svg";
</script>

<template>
  <section>
    <TopToolbar class="h-[62px] pb-1 content-end" />
    <div class="flex justify-center my-8">
      <NuxtLink to="/">
        <TalkualLogoDark class="w-auto h-10" :font-controlled="false" />
      </NuxtLink>
    </div>
    <div class="container mx-auto">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
