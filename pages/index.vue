<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-col">
    <LandingHeader />
    <Divider class="before:border-t-2 before:border-green-primary" />
    <LazyLandingBoxes :display-desktop="isDesktop" />
    <LazyLandingVegetablesOffers />
    <LazyLandingProducts :display-desktop="isDesktop" />
    <LandingUpToDate />
    <LandingBlog :display-desktop="isDesktop" />
    <LandingWorldData :display-desktop="isDesktop" />
    <LandingDonations :display-desktop="isDesktop" />
    <LazyLandingComments />
    <LandingHelp />
  </div>
</template>

<script setup lang="ts">
const { isDesktop } = useScreenSize()
</script>
