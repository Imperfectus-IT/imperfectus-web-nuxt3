<template>
  <main>
    <section class="sticky top-0 z-10">
      <TopToolbar class="h-[62px] pb-1 content-end lg:content-center"/>
      <MobileNavbarHeader class="lg:hidden bg-beige-primary" />
      <DesktopAuthNavbarHeader class="hidden lg:block bg-beige-primary" />
    </section>
    <slot />
    <FooterDefault />
  </main>
</template>
