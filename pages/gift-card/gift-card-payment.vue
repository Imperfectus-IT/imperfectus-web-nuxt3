<template>
  <h4 class="text-[60px] font-recoleta-regular leading-[60px] text-center">
    {{ route.query.status !== 'error' ? $t(`${section}.title`) : $t('gift-card.payment.fail') }}
  </h4>
  <div
    v-for="(card, index) in giftCard"
    :key="index"
    class="lg:w-1/2 lg:mx-auto mt-8"
  >
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
            <Button
              :label="$t(`${section}.edit`)"
              :pt="{ root: 'underline' }"
              @click="unshiftGiftCard(card.id)"
            />
          </NuxtLink>
          <Button
            class="ml-3"
            :label="$t(`${section}.delete`)"
            :pt="{ root: 'underline' }"
            @click="removeGiftCard(index)"
          />
        </div>
      </div>
      <p class="font-bold text-[26px] mt-6">
        {{ card.forWho }}
      </p>
      <p>{{ $t(`${section}.price`) }} {{ card.amount * card.quantity || card.amount }}€</p>
    </div>
  </div>
  <div class="lg:w-1/2 lg:mx-auto mt-8">
    <Divider class="!w-11/12 mx-auto " />
    <div class="flex flex-col px-4">
      <h4 class="font-bold text-[24px]">
        {{ $t(`${section}.amount`) }}{{ getTotalAmount }}€
      </h4>
      <NuxtLink :to="localePath({ name: 'gift-card-gift-card-create' })">
        <Button
          :label="$t(`${section}.add`)"
          :pt="{ root: 'underline' }"
          @click="addGiftCard"
        />
      </NuxtLink>
      <OrderPaymentForm
        ref="redsys"
        class="mt-6"
        :order="orderId"
        :loading="isLoading"
        @redirect="(submit) => handlePayment(submit)"
      >
        {{
          route.query.status === 'error'
            ? $t('gift-card.payment.form.repeat-submit')
            : $t('gift-card.payment.form.submit', { amount: getTotalAmount })
        }}
      </OrderPaymentForm>
    </div>
  </div>

  <GiftCardDoubts />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const localePath = useLocalePath()
const section = 'gift-card.payment'
const router = useRouter()
const route = useRoute()
const orderId = ref(null)
const status = ref('s')
const notification = ref('')
const userGiftCards = ref([])

const { giftCard, addGiftCard, removeGiftCard, executeCreateGiftCard } = useCreateGiftCardHandler()
const { getGiftCardByUser } = useGetGiftCardsHandler()

defineI18nRoute({
  paths: {
    es: '/tarjeta-regalo-digital/pago',
    ca: '/targeta-regal-digital/pagament',
  },
})

const setGiftCardFailed = async () => {
  if (route.query.status === 'error') {
    notification.value = route.query.notification
    status.value = route.query.status
    userGiftCards.value = await getGiftCardByUser()
    orderId.value = userGiftCards.value[0]?.order.id
    giftCard.value = [userGiftCards.value[0]]
  }
}

onMounted(async () => {
  await setGiftCardFailed()
})

const handlePayment = async (submitForm) => {
  if (status.value !== 'error') {
    const result = await executeCreateGiftCard()
    orderId.value = result?.order?.id
  }
  else {
    orderId.value = userGiftCards.value[0]?.order.id
    console.log('orderId', orderId)
  }
  setTimeout(async () => {
    await submitForm()
  }, 1000)
}

const getTotalAmount = computed(() => {
  let amount = 0
  if (status.value !== 'error') {
    giftCard.value.forEach((card: GiftCard) => {
      amount += card.amount * card.quantity
    })
  }
  else {
    return giftCard.value[0].amount
  }
  return amount
})

const unshiftGiftCard = (id: string) => {
  const card = giftCard.value.find(card => card.id === id)
  const index = giftCard.value.indexOf(card)
  giftCard.value.splice(index, 1)
  giftCard.value.unshift(card)
  router.push(localePath({ name: 'gift-card-gift-card-create', query: { card: card?.id } }))
}
</script>
