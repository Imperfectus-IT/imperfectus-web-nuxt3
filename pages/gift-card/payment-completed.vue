<template>
  <div class="px-8 lg:max-w-[1200px] mx-auto">
    <h1
        class="text-[60px] font-recoleta-regular leading-[60px] text-center my-6"
    >
      {{ $t("gift-card.status.title") }}
    </h1>
    <p class="text-[20px]">{{ $t("gift-card.status.description") }}</p>

    <div
        v-for="card in cards"
        class="flex flex-col lg:grid lg:grid-cols-4 lg:grid-rows-2 lg:mt-10"
        style="grid-template-rows: 200px auto;"
    >
      <NuxtImg
          v-if="imageUrl"
          :src="imageUrl"
          class="w-[330px] mx-auto my-9 lg:col-start-1 lg:my-0 lg:ml-0"
      />
      <div class="lg:col-start-2 lg:ml-4 lg:mt-6">
        <p>{{ card.message }}</p>
        <p class="mt-1 mb-5">{{ card.whoSend }}</p>
      </div>
      <div class="lg:col-start-1 lg:row-start-2">
        <p class="text-[26px]">{{ card.forWho }}</p>
        <p>{{ $t("gift-card.payment.price") }}</p>
      </div>
      <div class="lg:col-span-2 lg:w-7/12 lg:mx-auto">
        <p
            class="text-[26px] whitespace-normal font-recoleta-regular mt-4 lg:text-center"
        >
          {{ $t("gift-card.payment-completed.code") }}
        </p>
        <div
            class="border-2 border-green-primary py-5 text-center font-bold text-[18px] mb-16 mt-2"
        >
          {{ card.coupon }}
        </div>
      </div>
    </div>
    <Divider class="text-green-primary lg:mt-10"/>
    <p class="text-[20px] italic lg:text-center lg:mt-20">
      {{ $t("gift-card.payment-completed.comment") }}
    </p>
    <NuxtLink to="/" class="lg:flex lg:justify-center">
      <Button
          :label="$t('gift-card.payment-completed.button')"
          raised
          class="w-full mt-6 lg:w-1/3"
          :pt="{ label: 'text-[20px] font-bold py-3 lg:px-4' }"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const cards = ref([]);
const locale = useI18n().locale.value;

const imageUrl = computed(() => {
  return `/images/gift-card/cards/${locale}/${cards.value[0]?.designId}.webp`;
});

watch(() => {
  console.log("CARD", cards.value);
});

onMounted(async () => {
  console.log("ROUTE", route);
  const user = useStrapiUser();
  console.log("user", user);
  cards.value = await $fetch(
      `http://localhost:3000/order-payments/${route.query.notification}/cards`
  );
});
</script>
