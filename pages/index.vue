<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-col">
    <NavbarHeader />
    <div>
      <Toolbar>
        <template #center>
          <p>Envío GRATIS a toda la península</p>
        </template>
      </Toolbar>

      <Toolbar class="!p-0 bg-transparent border-none mt-2">
        <template #start>
          <Button
            icon="mdi mdi-menu"
            text
            raised
            aria-label="Menu"
            :pt="{ icon: 'text-xl' }"
          />
        </template>

        <template #center>
          <NuxtLink to="/">
            <TalkualLogoDark
              class="w-[156] h-7"
              :font-controlled="false"
            />
          </NuxtLink>
        </template>

        <template #end>
          <NuxtLink :to="localePath({ name: 'auth-login' })">
            <Button
              icon="mdi mdi-account"
              text
              raised
              aria-label="Account"
              :pt="{ icon: 'text-xl' }"
            />
          </NuxtLink>
        </template>
      </Toolbar>
    </div>

    <LandingHeader />
    <Divider class="before:border-t-2 before:border-green-primary" />
    <LandingBoxes :display-desktop="displayDesktop" /> 
    
    <!-- Offer -->
    <LandingVegetablesOffers
      :vegetables="vegetables"
    />
    
    <!-- Products -->
    <LandingProducts :display-desktop="displayDesktop" />
    <LandingUpToDate />
    <LandingBlog :display-desktop="displayDesktop" />
    <LandingWorldData :display-desktop="displayDesktop"/>
    <LandingDonations :display-desktop="displayDesktop"/>
    <LandingComments />
    <LandingHelp />
  </div>
</template>

<script setup lang="ts">
import TalkualLogoDark from "~/assets/images/svg/talkual-logo-dark.svg";

const displayDesktop = ref(false);

onBeforeMount(() => {
  if (window.innerWidth > 768) {
    console.log(window.innerWidth)
    displayDesktop.value = true;
  }
});

const vegetables = ref([
  {
    index: 1,
    image: "/images/landing/vegetables-carousel/1-zanahoria.webp",
    name: "Zanahoria-1",
  },
  {
    index: 2,
    image: "/images/landing/vegetables-carousel/2-berenjena.webp",
    name: "Berenjena-2",
  },
  {
    index: 3,
    image: "/images/landing/vegetables-carousel/3-tomate.webp",
    name: "Tomate-3",
  },
  {
    index: 4,
    image: "/images/landing/vegetables-carousel/4-berenjena.webp",
    name: "Berenjena-4",
  },
  {
    index: 5,
    image: "/images/landing/vegetables-carousel/5-tomate.webp",
    name: "Tomate-5",
  }
]);
</script>

