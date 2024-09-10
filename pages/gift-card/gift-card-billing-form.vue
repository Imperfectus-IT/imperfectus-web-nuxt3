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
        v-model="formData[$t(`${textData.section}.field_${field}.value`) as keyof BillingForm]"
        :disabled="field === 10"
        class="rounded-xl"
      />
    </div>
    <NuxtLink :to="localePath({ name: 'gift-card-gift-card-payment' })">
      <Button
        :label="$t('gift-card.create.form.button')"
        class="w-1/2 ml-[25%]"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { BillingForm } from '~/components/gift-card/types/types'

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

const localePath = useLocalePath()
const { orders } = useGetOrdersHandler(t)

const textData = {
  fields: 10,
  section: 'gift-card.billing-form',
}
// @TODO validate form
const formData = ref<BillingForm>({
  name: '',
  surname: '',
  nif: '',
  email: '',
  address1: '',
  address2: '',
  postalCode: '',
  city: '',
  state: '',
  country: 'ES',
})

watchEffect(() => {
  if (orders) {
    const billingData = orders.value[0]?.billingInfo
    if (billingData) {
      const name = billingData.billingFirstName
      const surname = billingData.billingLastName
      formData.value = {
        name,
        surname,
        nif: billingData.billingCif,
        email: billingData.billingEmail,
        address1: billingData.billingAddress,
        address2: billingData.billingAddress2,
        postalCode: billingData.billingPostCode,
        city: billingData.billingCity,
        state: billingData.billingState,
        country: billingData.billingCountry,
      }
    }
  }
})
</script>
