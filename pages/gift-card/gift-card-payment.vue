<template>
  <h4 class="text-[60px] font-recoleta-regular leading-[60px] text-center">
    {{ $t(`${section}.title`) }}
  </h4>
  {{giftCard}}
  <div class="lg:w-1/2 lg:mx-auto mt-8" v-for="(card, index) in giftCard" :key="index">
    <NuxtImg
      alt="gift_card"
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
          <NuxtLink>
            <Button @click="unshiftGiftCard(card.id)" :label="$t(`${section}.edit`)" :pt="{ root: 'underline' }"/>
          </NuxtLink>
          <Button
              @click="removeGiftCard(index)"
              class="ml-3"
              :label="$t(`${section}.delete`)"
              :pt="{ root: 'underline' }"
          />
        </div>
      </div>
      <p class="font-bold text-[26px] mt-6">{{ card.forWho }}</p>
      <p>{{ $t(`${section}.price`) }} {{ card.amount * card.quantity }}€</p>
    </div>
  </div>
  <div class="lg:w-1/2 lg:mx-auto mt-8">
    <Divider class="!w-11/12 mx-auto " />
    <div class="flex flex-col px-4">
      <h4 class="font-bold text-[24px]">
        {{ $t(`${section}.amount`) }}{{ getTotalAmount }}€
      </h4>
      <NuxtLink :to="localePath({ name: 'gift-card-gift-card-create' })">
        <Button :label="$t(`${section}.add`)" :pt="{ root: 'underline' }" @click="addGiftCard"/>
      </NuxtLink>
        <OrderPaymentForm
            ref="redsys"
            class="mt-6"
            :order="orderId"
            :loading="isLoading"
            @redirect="(submit) => handlePayment(submit)"
        >
          {{ $t('gift-card.payment.form.repeat-submit') }}
        </OrderPaymentForm>
    </div>
  </div>

  <GiftCardDoubts />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const localePath = useLocalePath();
const section = "gift-card.payment";
const route = useRouter();
const orderId = ref(null)

const { giftCard, addGiftCard, removeGiftCard, executeCreateGiftCard } = useCreateGiftCardHandler();

defineI18nRoute({
  paths: {
    es: "/tarjeta-regalo/pago",
    ca: "/targeta-regal/pagament",
  },
});

const handlePayment = async (submitForm) => {
  const result = await executeCreateGiftCard();
  orderId.value = result?.order?.id;
  setTimeout(async () => {
    await submitForm()
  }, 1000)
}

const getTotalAmount = computed(() => {
  let amount = 0;
  giftCard.value.forEach((card: GiftCard) => {
    amount += card.amount * card.quantity;
  });
  return amount
});

const unshiftGiftCard = (id: string) => {
  const card = giftCard.value.find(card => card.id === id);
  const index = giftCard.value.indexOf(card);
  giftCard.value.splice(index, 1);
  giftCard.value.unshift(card);
  route.push(localePath({ name: "gift-card-gift-card-create", query: { card: card?.id } }));
};

</script>


