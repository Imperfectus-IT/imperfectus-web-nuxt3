<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts"></script>

<template>
  <div class="mx-auto ">
    <TopToolbar class="h-14" />
    <MobileAdminNavbarHeader class="lg:hidden bg-beige-primary" />
    <DesktopAdminNavbarHeader class="hidden lg:block bg-beige-primary mb-0" />
    <div class="lg:grid lg:grid-cols-4 ">
      <SideMenu class="hidden lg:block lg:h-[450px]" />
      <slot />
    </div>
    <LazyFooterDefault />
  </div>
</template>

<style scoped lang="scss"></style>
