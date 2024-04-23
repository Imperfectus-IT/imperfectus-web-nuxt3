<template>
  <main>
    <section class="sticky top-0 z-10">
      <TopToolbar class="h-[62px] pb-1 content-end lg:content-center"/>
      <MobileNavbarHeader class="lg:hidden bg-transparent" />
      <DesktopAuthNavbarHeader class="hidden lg:block bg-transparent" />
    </section>
    <slot />
    <FooterDefault />
  </main>
</template>
