<template>
  <h4 class="font-recoleta-regular text-center text-[30px] mb-4">
    {{ $t(`${textData.section}.title`) }}
  </h4>
  <div
    v-for="field in textData.fields"
    :key="field"
    class="flex flex-col gap-1 px-8 mb-6"
  >
    <label for="username">{{
      $t(`${textData.section}.field_${field}.label`)
    }}</label>
    <InputText
      :disabled="field === 10"
      :id="$t(`${textData.section}.field_${field}.label`)"
      class="rounded-xl"
      v-model="formData[$t(`${textData.section}.field_${field}.value`)]"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineI18nRoute({
  paths: {
    ca: "/targeta-regal/facturacion",
    es: "/tarjeta-regalo/facturacio",
  },
});

const user = useStrapiUser();

const { orders } = useGetOrdersHandler(t);
const { giftCard } = useGiftCardHandler();

const textData = {
  fields: 10,
  section: "gift-card.billing-form",
};

const formData = ref<BillingForm>({
  name: "",
  surname: "",
  nif: "",
  email: "",
  address1: "",
  address2: "",
  postalCode: "",
  city: "",
  state: "",
  country: "ES",
});

watchEffect(() => {
  if (orders) {
    const billingData = orders.value[0]?.billingInfo;
    if (billingData) {
      const name = billingData.billingFullName.split(" ")[0]
      const surname = billingData.billingFullName.split(" ")[1]
      formData.value = {
        name,
        surname,
        nif: billingData.billingNif,
        email: billingData.billingEmail,
        address1: billingData.billingAddress,
        address2: billingData.billingAddress2,
        postalCode: billingData.billingCP,
        city: billingData.billingCity,
        state: billingData.billingState,
        country: billingData.billingCountry,

      };
    }
  }
});

// const setBillingData = () => {
//   formData.value = {
//     nif: orders.value[0]?.billingInfo.billingNif
//   }
// }

export type BillingForm = {
  name: string;
  surname: string;
  nif: string;
  email: string;
  address1: string;
  address2: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
};
</script>
