<template>
  <div class="mx-auto">
    <TopToolbar class="h-14" />
    <MobileAdminNavbarHeader class="lg:hidden bg-beige-primary" />
    <DesktopAdminNavbarHeader class="hidden lg:block bg-beige-primary mb-0" />
    <div class="p-6 lg:p-8 lg:flex lg:flex-col-2 lg:gap-8 xl:gap-16">
      <SideMenu class="hidden lg:block lg:h-[450px] xl:w-full" />
      <slot />
    </div>
    <LazyFooterDefault />
  </div>
</template>

<script setup lang="ts">
useGetSubscriptionsHandler()
</script>
