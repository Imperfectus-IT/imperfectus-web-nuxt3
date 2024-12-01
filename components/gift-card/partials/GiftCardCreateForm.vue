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
        v-if="index !== 1 && displayErrors"
        class="text-red-primary"
      >
        {{ validationErrors?.[field as keyof GiftCardForm]?._errors[0] ?? '' }}
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
        v-if="index === 1 && displayErrors"
        class="text-red-primary"
      >
        {{ validationErrors?.[field as keyof GiftCardForm]?._errors[0] ?? '' }}
      </p>
    </div>
    <div class="mt-8 lg:w-2/3">
      <span class="text-[20px]">{{ $t("gift-card.create.form.description") }}</span>
      <NuxtLink :to="localePath({ name: 'legal-conditions' })">
        <span class="underline text-[20px]">{{ " " + $t("gift-card.create.form.description_link") }}</span>
      </NuxtLink>
    </div>
    <Button
      :pt="{
        root: 'bg-green-primary w-2/3 mt-12 font-bold py-1 lg:py-2 lg:w-1/4 rounded-md disabled:opacity-50',
        label: 'text-[18px]',
      }"
      :label="$t('gift-card.create.form.button')"
      @click="submitForm"
    />
  </div>
  {{ giftCardPurchase.currentItem }}
</template>

<script setup lang="ts">
import type { GiftCardForm } from '~/components/gift-card/types/types.ts'

const emit = defineEmits(['formSubmit'])
const localePath = useLocalePath()

const { validateSchema, validationErrors } = useGiftFormValidator()
const { giftCardPurchase } = useCreateGiftCardHandler()
const isFormErrored = ref<boolean>(true)
const displayErrors = ref<boolean>(false)

const textData = {
  priceButtons: 3,
  quantityButtons: [1, 2, 4, 8],
  fields: ['forWho', 'message', 'whoSend', 'sendMethod'],
  section: 'gift-card.create.form.field_',
}

const formData: GiftCardForm = reactive({
  amount: giftCardPurchase.value.currentItem.amount || 21.07,
  quantity: giftCardPurchase.value.currentItem.quantity || 1,
  message: giftCardPurchase.value.currentItem.message || '',
  whoSend: giftCardPurchase.value.currentItem.whoSend || '',
  forWho: giftCardPurchase.value.currentItem.forWho || '',
  sendMethod: giftCardPurchase.value.currentItem.sendMethod || '',
})

watch(formData, () => {
  console.log('watch', giftCardPurchase.value.currentItem)
  validateSchema(formData)
  console.log(validationErrors.value)
  validationErrors.value ? isFormErrored.value = true : isFormErrored.value = false
}, { immediate: true })

watch(giftCardPurchase, () => {
  console.log('sec watch', giftCardPurchase.value.currentItem)
}, { immediate: true })

const submitForm = () => {
  if (!isFormErrored.value) {
    emit('formSubmit')
  }
  else {
    displayErrors.value = true
  }
}

const setPrice = (price: string) => {
  formData.amount = parseFloat(price)
}

const setQuantity = (quantity: string) => {
  formData.quantity = parseInt(quantity)
}

const getTotalPrice = computed(() => {
  return formData.quantity * giftCardPurchase.value.currentItem.amount + '€'
})
</script>
