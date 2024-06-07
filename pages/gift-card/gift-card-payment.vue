<template>
  <h4 class="text-[60px] font-recoleta-regular leading-[60px] text-center">
    {{ $t(`${section}.title`) }}
  </h4>
  <div class="lg:w-1/2 lg:mx-auto mt-8" v-for="(card, index) in giftCard" :key="index">
    <NuxtImg
      alt="giftcard"
      :src="`images/gift-card/cards/${locale}/${card.designId}.webp`"
      loading="lazy"
      format="webp"
      class="w-full p-4 lg:w-[315px]"
    />

    <div class="px-4">
      <p>{{ card.message }}</p>
      <div class="flex flex-row justify-between mt-4">
        <span>{{ card.whoSend }}</span>
        <div>
          <NuxtLink
            ><Button :label="$t(`${section}.edit`)" :pt="{ root: 'underline' }"
          /></NuxtLink>
          <NuxtLink
            ><Button
              class="ml-3"
              :label="$t(`${section}.delete`)"
              :pt="{ root: 'underline' }"
          /></NuxtLink>
        </div>
      </div>
      <p class="font-bold text-[26px] mt-6">{{ card.forWho }}</p>
      <p>{{ $t(`${section}.price`) }} {{ card.amount }}€</p>
    </div>
    <Divider class="!w-11/12 mx-auto " />
    <div class="flex flex-col px-4">
      <h4 class="font-bold text-[24px]">
        {{ $t(`${section}.amount`) }}{{ getTotalAmount }}€
      </h4>
      <NuxtLink
        ><Button :label="$t(`${section}.add`)" :pt="{ root: 'underline' }"
      /></NuxtLink>
      <Button
        class="w-full mt-10"
        :pt="{ label: 'font-bold text-[20px]' }"
        raised
        :label="$t(`${section}.pay`, { amount: getTotalAmount })"
      />
    </div>
  </div>
  <GiftCardDoubts />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const section = "gift-card.payment";

defineI18nRoute({
  paths: {
    ca: "/targeta-regal/pagament",
    es: "/tarjeta-regalo/pago",
  },
});

const getTotalAmount = computed(() => {
  let amount = 0;
  giftCard.value.forEach((card: GiftCard) => {
    amount += card.amount;
  });
  return amount
});

const { giftCard } = useCreateGiftCardHandler();
</script>
