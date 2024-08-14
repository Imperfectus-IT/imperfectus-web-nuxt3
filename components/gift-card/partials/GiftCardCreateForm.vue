<template>
  <!-- PRECIOS SUGERIDOS -->
  <div class="lg:w-2/3">
    <div class="flex flex-col gap-2 mt-20 lg:text-[20px] ">
      <p class="font-bold">
        {{ $t(`${textData.section}price.title`) }}
      </p>
      <div class="lg:flex lg:flex-row lg:gap-5">
        <Button
          v-for="button in textData.priceButtons"
          :key="button"
          v-model="formData.amount"
          class="w-full shadow-sm bg-green-quaternary mb-2 lg:mb-0 hover:!bg-green-primary hover:!text-green-tertiary"
          :class="{
            '!bg-green-primary !text-green-tertiary ':
              formData.amount.toString() === $t(`${textData.section}price.option_${button}.price`),
          }"
          @click="setPrice($t(`${textData.section}price.option_${button}.price`))"
        >
          <div class="p-3 font-bold text-[14px]">
            <p class="text-[24px] mb-1">
              {{ $t(`${textData.section}price.option_${button}.price`) }}€
            </p>
            <p>{{ $t(`${textData.section}price.option_${button}.box`) }}</p>
          </div>
        </Button>
      </div>
    </div>

    <!-- NÚMERO DE CAJAS -->
    <div class="mt-10 lg:text-[20px]">
      <p class="font-bold mb-4">
        {{ $t(`${textData.section}quantity.title`) }}
      </p>
      <div class="lg:flex lg:flex-row lg:gap-5">
        <Button
          v-for="(quantity, index) in textData.quantityButtons"
          :key="index"
          class="w-full mb-2 shadow-sm bg-green-quaternary hover:!bg-green-primary hover:!text-green-tertiary"
          :class="{
            '!bg-green-primary !text-green-tertiary':
              formData.quantity === quantity,
          }"
          @click="setQuantity(quantity.toString())"
        >
          <p class="text-[14px] font-bold py-1">
            {{ quantity }}
          </p>
        </Button>
      </div>
    </div>

    <!-- RESUMEN DE PRECIO -->
    <p class="font-bold mb-4 mt-8 lg:text-[20px]">
      {{ $t(`${textData.section}amount.title`) }}
    </p>
    <InputText
      class="rounded-xl w-full"
      type="text"
      :value="getTotalPrice"
    />

    <div
      v-for="(field, index) in textData.fields"
      :key="field"
      class="flex flex-col gap-2 mt-10"
    >
      <p class="font-bold lg:text-[20px]">
        {{ $t(`${textData.section}${field}.title`) }}
      </p>
      <InputText
        v-if="index !== 1"
        v-model="formData[field as keyof GiftCardForm]"
        class="rounded-xl"
        type="text"
        :placeholder="$t(`${textData.section}${field}.placeholder`)"
      />
      <p
        v-if="index !== 1"
        class="text-red-primary"
      >
        {{ getValidationError(field as keyof GiftCardForm) }}
      </p>
      <Textarea
        v-if="index === 1"
        v-model="formData.message"
        :pt="{
          root:
            'placeholder:text-green-tertiary placeholder:opacity-50 border rounded-xl p-3 focus:outline-none',
        }"
        class="bg-transparent text-green-tertiary"
        rows="5"
        :placeholder="$t(`${textData.section}${field}.placeholder`)"
      />
      <p
        v-if="index === 1"
        class="text-red-primary"
      >
        {{ getValidationError(field as keyof GiftCardForm) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type GiftCardForm } from '../types/types'
import { useCreateGiftCardHandler } from '~/composables/gift-card/create/useCreateGiftCardHandler.ts'

const emit = defineEmits(['formUpdated'])

const { validateSchema, validationErrors } = useGiftFormValidator()
const { giftCard } = useCreateGiftCardHandler()

const textData = {
  priceButtons: 3,
  quantityButtons: [1, 2, 4, 8],
  fields: ['forWho', 'message', 'whoSend', 'sendMethod'],
  section: 'gift-card.create.form.field_',
}

const formData: GiftCardForm = reactive({
  amount: 21.07,
  quantity: 1,
  message: '',
  whoSend: '',
  forWho: '',
  sendMethod: '',
})

watchEffect(() => {
  formData.amount = giftCard.value[0].amount
  formData.quantity = giftCard.value[0].quantity
  formData.message = giftCard.value[0].message
  formData.whoSend = giftCard.value[0].whoSend
  formData.forWho = giftCard.value[0].forWho
  formData.sendMethod = giftCard.value[0].sendMethod
})

watch(formData, () => {
  validateSchema(formData)
  emit('formUpdated', { formData, errors: validationErrors })
})

const setPrice = (price: string) => {
  formData.amount = parseFloat(price)
}

const setQuantity = (quantity: string) => {
  formData.quantity = parseInt(quantity)
}

const getValidationError = (field: keyof GiftCardForm) => {
  const errors = validationErrors.value as unknown as {
    [K in keyof GiftCardForm]?: { _errors: string[] };
  }
  if (errors && errors[field]) {
    return errors[field]?._errors[0]
  }
  return null
}

const getTotalPrice = computed(() => {
  return formData.quantity * formData.amount + '€'
})
</script>
