<template>
  <main>
    <section class="sticky top-0 z-10">
      <TopToolbar />
      <MobileNavbarHeader class="lg:hidden bg-beige-primary" />
      <DesktopNavbarHeader class="hidden lg:block bg-beige-primary" />
    </section>
    <div class="text-green-tertiary">
      <slot />
    </div>
    <LazyFooterDefault />
  </main>
</template>
