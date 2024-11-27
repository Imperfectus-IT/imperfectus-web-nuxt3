<template>
  <div class="lg:w-1/2 lg:mx-auto">
    <h4 class="font-recoleta-regular text-center text-[30px] lg:text-[50px] mb-4">
      {{ $t(`${textData.section}.title`) }}
    </h4>
    <div
      v-for="field in textData.fields"
      :key="field"
      class="flex flex-col gap-1 px-8 mb-6"
    >
      <label for="username">{{ $t(`${textData.section}.field_${field}.label`) }}</label>
      <InputText
        :id="$t(`${textData.section}.field_${field}.label`)"
        v-model="formData[$t(`${textData.section}.field_${field}.value`) as keyof OrderBilling]"
        :disabled="field === 10"
        class="rounded-xl"
      />
    </div>
    <NuxtLink :to="localePath({ name: 'gift-card-gift-card-payment' })">
      <Button
        :label="$t('gift-card.create.form.button')"
        class="w-1/2 ml-[25%]"
        @click.prevent="handleNextStep"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { createEmptyGiftCard } from '@/composables/gift-card/domain/GiftCard.ts'

const { t } = useI18n()

useHead({
  title: t('gift-card-create.title'),
  meta: [
    {
      name: 'description',
      content: t('gift-card-create.description'),
    },
  ],
})

defineI18nRoute({
  paths: {
    ca: '/targeta-regal-digital/facturacio',
    es: '/tarjeta-regalo-digital/facturacion',
  },
})
const { getGiftCardPurchase, setGiftCardPurchase } = useLocalStorageGiftCardRepository()
const localePath = useLocalePath()
const { orders } = useGetOrdersHandler(t)
const { giftCardPurchase } = useGiftCardPurchaseState()
const router = useRouter()

const textData = {
  fields: 10,
  section: 'gift-card.billing-form',
}
const formData = ref<OrderBilling>({
  billingFirstName: '',
  billingLastName: '',
  billingEmail: '',
  billingPhone: '',
  billingAddress: '',
  billingAddress2: '',
  billingPostCode: '',
  billingCity: '',
  billingState: '',
  billingCif: '',
  billingCountry: 'ES',
})

const handleNextStep = () => {
  giftCardPurchase.value.items.push(giftCardPurchase.value.currentItem)
  giftCardPurchase.value.currentItem = createEmptyGiftCard()
  setGiftCardPurchase(giftCardPurchase.value)
  router.push(localePath({ name: 'gift-card-gift-card-payment' }))
}

onMounted(() => {
  giftCardPurchase.value = giftCardPurchase.value.currentItem.forWho ? giftCardPurchase.value : getGiftCardPurchase() ? getGiftCardPurchase() : giftCardPurchase.value
})

watch(formData, () => {
  giftCardPurchase.value.billing = formData.value
}, { deep: true })

watchEffect(() => {
  if (orders) {
    const billingData: OrderBilling = orders.value[0]?.billingInfo
    if (billingData) {
      formData.value = billingData
    }
  }
})
</script>
