<template>
  <main>
    <TopToolbar />
    <MobileNavbarHeader class="lg:hidden" />
    <DesktopNavbarHeader class="hidden lg:block" />
    <slot />
    <FooterDefault />
  </main>
</template>
