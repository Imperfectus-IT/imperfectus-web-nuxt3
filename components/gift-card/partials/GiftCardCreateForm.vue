<template>
  <!-- PRECIOS SUGERIDOS -->
  <div class="flex flex-col gap-2 mt-20">
    <p class="font-bold">
      {{ $t(`${textData.section}price.title`) }}
    </p>
    <div class="lg:flex lg:flex-row lg:gap-5">
      <Button
        v-for="button in textData.priceButtons"
        :key="button"
        v-model="formData.price"
        class="w-full shadow-sm bg-green-quaternary mb-2 lg:mb-0"
        :class="{
          'bg-green-tertiary text-green-primary':
            formData.price
            === $t(`${textData.section}price.option_${button}.price`),
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
  <div class="mt-10">
    <p class="font-bold mb-4">
      {{ $t(`${textData.section}quantity.title`) }}
    </p>
    <div class="lg:flex lg:flex-row lg:gap-5">
      <Button
        v-for="(quantity, index) in textData.quantityButtons"
        :key="index"
        class="w-full mb-2 shadow-sm bg-green-quaternary"
        :class="{
          'bg-green-tertiary text-green-primary':
            parseInt(formData.quantity) === quantity,
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
  <p class="font-bold mb-4 mt-8">
    {{ $t(`${textData.section}resume.title`) }}
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
    <p class="font-bold">
      {{ $t(`${textData.section}${field}.title`) }}
    </p>
    <InputText
      v-if="index !== 1"
      v-model="formData[field as keyof FormData]"
      class="rounded-xl"
      type="text"
      :placeholder="$t(`${textData.section}${field}.placeholder`)"
    />
    <p
      v-if="index !== 1"
      class="text-red-primary"
    >
      {{ getValidationError(field as keyof FormData) }}
    </p>
    <Textarea
      v-if="index === 1"
      v-model="formData.message"
      :pt="{
        root: 'placeholder:text-green-tertiary placeholder:opacity-50 border rounded-xl p-3 focus:outline-none',
      }"
      class="bg-transparent text-green-tertiary"
      rows="5"
      :placeholder="$t(`${textData.section}${field}.placeholder`)"
    />
    <p
      v-if="index === 1"
      class="text-red-primary"
    >
      {{ getValidationError(field as keyof FormData) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { type FormData } from '../types/types'

const emit = defineEmits(['formUpdated'])

const { validateSchema, validationErrors } = useGiftFormValidator()

const textData = {
  priceButtons: 3,
  quantityButtons: [1, 2, 4, 8],
  fields: ['receiver', 'message', 'sender', 'email'],
  section: 'gift-card.create.form.field_',
}

const formData: FormData = reactive({
  price: '21.07',
  quantity: '1',
  message: '',
  sender: '',
  receiver: '',
  email: '',
})

watch(formData, () => {
  validateSchema(formData)
  emit('formUpdated', validationErrors)
})

const setPrice = (price: string) => {
  formData.price = price
}

const setQuantity = (quantity: string) => {
  formData.quantity = quantity
}

const getValidationError = (field: keyof FormData) => {
  const errors = validationErrors.value as unknown as {
    [K in keyof FormData]?: { _errors: string[] };
  }
  if (errors && errors[field]) {
    return errors[field]?._errors[0]
  }
  return null
}

const getTotalPrice = computed(() => {
  return parseFloat(formData.quantity) * parseFloat(formData.price) + '€'
})
</script>
