<script setup lang="ts">
import { useValidateBillingForm } from '~/composables/shopping-cart/domain/useValidateBillingForm.ts'

const { shoppingCart } = useShoppingCartState()
const { validateSchema, errors } = useValidateBillingForm()
const props = defineProps<{
  displayErrors: boolean
}>()

onMounted(() => {
  validateSchema(shoppingCart.value.billingAddress)
})

watch(shoppingCart, () => {
  validateSchema(shoppingCart.value.billingAddress)
}, { deep: true })

defineExpose({ errors })
</script>

<template>
  <p class=" font-recoleta-regular text-[40px] font-normal w-full text-center">
    {{ $t(`orderMeta.billingAddressTitle`) }}
  </p>
  <div class="lg:col-span-2 lg:flex lg:flex-row lg:justify-end hidden ">
    <Button
      outlined
      :label="$t('orderMeta.cleanData')"
      :pt="{
        root: 'border-[1px] px-4 py-0.5 rounded-md my-4',
        label: 'text-xs',
      }"
    />
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.billing_fields.firstname') }}
    </span>
    <InputText
      v-model="shoppingCart.billingAddress.billingFirstName"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.billingFirstName?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.billing_fields.lastname') }}
    </span>
    <InputText
      v-model="shoppingCart.billingAddress.billingLastName"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.billingLastName?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.billing_fields.cif') }}
    </span>
    <InputText
      v-model="shoppingCart.billingAddress.billingCif"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.billingCif?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.billing_fields.billing_company') }}
    </span>
    <InputText
      v-model="shoppingCart.billingAddress.billingSocialName"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.billingSocialName?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.billing_fields.email') }}
    </span>
    <InputText
      v-model="shoppingCart.billingAddress.billingEmail"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.billingEmail?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.billing_fields.phone') }}
    </span>
    <InputText
      v-model="shoppingCart.billingAddress.billingPhone"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.billingPhone?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.billing_fields.company') }}
    </span>
    <InputText
      v-model="shoppingCart.billingAddress.billingCompany"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.billingCompany?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.billing_fields.address1') }}
    </span>
    <InputText
      v-model="shoppingCart.billingAddress.billingAddress"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.billingAddress?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.billing_fields.address2') }}
    </span>
    <InputText
      v-model="shoppingCart.billingAddress.billingAddress2"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.billing_fields.postalCode') }}
    </span>
    <InputText
      v-model="shoppingCart.billingAddress.billingPostCode"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.billingPostCode?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.billing_fields.city') }}
    </span>
    <InputText
      v-model="shoppingCart.billingAddress.billingCity"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.billingCity?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.billing_fields.state') }}
    </span>
    <InputText
      v-model="shoppingCart.billingAddress.billingState"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.billingState?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.billing_fields.country') }}
    </span>
    <Dropdown
      v-model="shoppingCart.billingAddress.billingCountry"
      :pt="{ root: 'text-[16px] bg-transparent border-[1px] rounded-lg w-full mb-4 mt-2 py-1 flex' }"
      :options="[{ label: 'España', value: 'ES' }]"
      option-value="value"
      option-label="label"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.billingCountry?._errors[0] }}</span>
  </div>
</template>
