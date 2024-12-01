<template>
  <h4 class="text-[60px] font-recoleta-regular leading-[60px] text-center">
    {{ route.query.status !== 'error' ? $t(`${section}.title`) : $t('gift-card.payment.fail') }}
  </h4>
  <div
    v-for="(card, index) in giftCardPurchase.items"
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
          <Button
            :label="$t(`${section}.edit`)"
            :pt="{ root: 'underline' }"
            @click="editGiftCard(card.uuid as string)"
          />
          <Button
            class="ml-3"
            :label="$t(`${section}.delete`)"
            :pt="{ root: 'underline' }"
            @click="removeGiftCard(card.uuid as string)"
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
      <NuxtLink :to="localePath({ name: 'gift-card-gift-card-create', query: { add: true } })">
        <Button
          :label="$t(`${section}.add`)"
          :pt="{ root: 'underline' }"
        />
      </NuxtLink>
      <RedsysPaymentForm
        ref="redsysForm"
        :order="order"
        :is-button-outlined="false"
      />
      <Button
        class="w-full lg:mx-auto lg:mt-8 border-none font-solina-extended-medium font-bold lg:text-[20px] py-3"
        @click="handlePayment"
      >
        {{
          route.query.status === 'error'
            ? $t('gift-card.payment.form.repeat-submit')
            : $t('gift-card.payment.form.submit', { amount: getTotalAmount })
        }}
      </Button>
    </div>
  </div>

  <GiftCardDoubts />
  <Toast />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const redsysForm = ref<HTMLFormElement | null>(null)
const localePath = useLocalePath()
const section = 'gift-card.payment'
const router = useRouter()
const route = useRoute()
const status = ref('')
const notification = ref('')
const { t } = useI18n()

const { giftCardPurchase, executeCreateGiftCard } = useCreateGiftCardHandler()
const { getGiftCardPurchase, setGiftCardPurchase } = useLocalStorageGiftCardRepository()
const { order } = useOrdersState()
const { executeGetGiftCardByNotification, giftCards } = useGetGiftCardByNotificationHandler()

useHead({
  title: t('gift-card-payment.title'),
  meta: [
    {
      name: 'description',
      content: t('gift-card-payment.description'),
    },
  ],
})

defineI18nRoute({
  paths: {
    es: '/tarjeta-regalo-digital/pago',
    ca: '/targeta-regal-digital/pagament',
  },
})

const editGiftCard = (id: string) => {
  giftCardPurchase.value.currentItem = giftCardPurchase.value.items.find((card: GiftCard) => card.uuid === id) as GiftCard
  giftCardPurchase.value.items = giftCardPurchase.value.items.filter((card: GiftCard) => card.uuid !== id)
  setGiftCardPurchase(giftCardPurchase.value)
  router.push(localePath({ name: 'gift-card-gift-card-create' }))
}

const removeGiftCard = (id: string) => {
  if (giftCardPurchase.value.items.length > 1) {
    giftCardPurchase.value.items = giftCardPurchase.value.items.filter((card: GiftCard) => card.uuid !== id)
    setGiftCardPurchase(giftCardPurchase.value)
  }
}

const setGiftCardFailed = async () => {
  if (route.query.status === 'error') {
    status.value = route.query.status
    notification.value = route.query.notification as string
    await executeGetGiftCardByNotification(notification.value)
    order.value = { id: giftCards.value[0]?.order }
  }
}

onMounted(async () => {
  await setGiftCardFailed()
  giftCardPurchase.value = giftCardPurchase.value.currentItem.forWho ? giftCardPurchase.value : getGiftCardPurchase() ? getGiftCardPurchase() : giftCardPurchase.value
})

const handlePayment = async () => {
  if (status.value !== 'error') {
    await executeCreateGiftCard()
  }
  await redsysForm.value?.submit()
}

const getTotalAmount = computed(() => {
  let amount = 0
  giftCardPurchase.value.items.forEach((card: GiftCard) => {
    amount += card.amount * card.quantity
  })

  return amount.toFixed(2)
})
</script>
