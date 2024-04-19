<script setup lang="ts">
const { isMobile } = useScreenSize();

const images = [
  {
    image: "/images/boxes/Caixa-S.webp",
    alt: "boxes.s.alt",
  },
  {
    image: "/images/boxes/Caixa-M.webp",
    alt: "boxes.m.alt",
  },
  {
    image: "/images/boxes/Caixa-XL.webp",
    alt: "boxes.xl.alt",
  },
];
</script>

<template>
  <div
    class="bg-green-tertiary text-beige-primary font-solina-extended-book md:flex md:items-center"
  >
    <div class="pt-6 pr-5 pb-6 pl-5">
      <SectionTitle
        :value="$t('companies.all-fruit')"
        class="text-lg text-green-primary"
        title-class="mb-6"
      />

      <p class="leading-tight">
        {{ $t("companies.offer") }}
      </p>

      <div class="flex flex-col gap-y-4 mt-6">
        <ListItem :text="$t('companies.s')" />
        <ListItem :text="$t('companies.im')" />
        <ListItem :text="$t('companies.xl')" />
      </div>
    </div>

    <TKCarousel
      :data="images"
      :show-pagination="true"
      :show-navigation="!isMobile"
      class="flex-1"
    ></TKCarousel>
  </div>
</template>

<style scoped lang="scss"></style>
