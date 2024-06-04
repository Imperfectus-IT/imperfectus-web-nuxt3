<template>
  <div class="flex flex-col gap-5 text-[23px] px-8 lg:grid lg:grid-cols-2 lg:px-20">
    <h4
      class="font-recoleta-regular text-[45px] leading-[48px] whitespace-normal lg:my-10 lg:text-[60px]"
    >
      {{ $t("gift-card.title") }}
    </h4>
    <div class="flex flex-col gap-8 lg:col-start-1 lg:w-4/6">
      <p>{{ $t("gift-card.description1") }}</p>
      <p>{{ $t("gift-card.description2") }}</p>
      <p class="font-bold whitespace-normal lg:mb-20">
        {{ $t("gift-card.description3") }}
      </p>
    </div>
    <NuxtImg
      alt="cards"
      :src="'/images/gift-card/cards.webp'"
      loading="lazy"
      format="webp"
      class="w-[330px] h-[210px]"
    />
  </div>
</template>
