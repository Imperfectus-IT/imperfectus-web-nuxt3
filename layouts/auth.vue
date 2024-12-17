<template>
  <main>
    <section class="sticky top-0 z-10 bg-beige-primary">
      <TopToolbar class="h-[62px] content-end lg:content-center" />
      <MobileNavbarHeader class="lg:hidden bg-transparent" />
      <DesktopAuthNavbarHeader class="hidden lg:block bg-transparent" />
      <Divider class="mt-0" />
    </section>
    <slot />
    <FooterDefault />
  </main>
</template>
