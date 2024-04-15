<template>
  <main>
    <section class="fixed top-0 z-20 w-full text-green-tertiary">
      <TopToolbar />
      <MobileNavbarHeader class="lg:hidden bg-beige-primary" />
      <DesktopNavbarHeader class="hidden lg:block bg-beige-primary mb-0" />
    </section>
    <div class="pt-10 lg:pt-24 text-green-tertiary">
      <slot />
    </div>
    <LazyFooterDefault />
  </main>
</template>
