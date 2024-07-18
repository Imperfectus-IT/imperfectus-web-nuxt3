<script setup lang="ts">
const emit = defineEmits(['goToStep'])
const textData = {
  section: 'shopping_cart.paymentStep.',
  conditions: {
    quantity: 3,
    subSections: ['text_1', 'text_2bold', 'text_3'],
  },
}

const isPaymentSelected = ref(true)
const optionsChecked = reactive({
  0: false,
  1: false,
  2: false,
})
const addTextStyle = (key: string) => {
  return key.includes('bold') ? 'font-bold' : key.includes('underline') ? 'underline' : ''
}
</script>

<template>
  <div class="px-10 lg:w-1/2 lg:border-[1px] lg:rounded-md lg:p-10">
    <div class="flex items-center justify-center gap-3 mt-3 relative">
      <Button
        class="w-[2rem] h-[2rem] text-xl !absolute left-0"
        icon="mdi mdi-chevron-left"
        rounded
        outlined
        @click.prevent="$emit('goToStep', DELIVERY_STEP)"
      />
      <p class="font-recoleta-regular text-xl font-normal text-center w-2/3">
        {{ $t(`${textData.section}title`) }}
      </p>
    </div>
    <div class="mt-10 flex flex-row">
      <Checkbox
        v-model="isPaymentSelected"
        binary
        :pt="{
          box: `border-[2px] w-[20px] h-[20px] rounded-full ${isPaymentSelected ? 'bg-green-primary p-2' : 'bg-transparent'}`,
          icon: 'hidden',
        }"
      />
      <p class="ml-3 text-[14px]">
        {{ $t(`${textData.section}payment`) }}
      </p>
    </div>

    <div
      class="flex flex-row items-center gap-3 mt-4"
    >
      <NuxtImg
        alt="google_icon"
        format="webp"
        loading="lazy"
        src="/images/logos/payment/google.webp"
        class="w-[50px] "
      />
      <NuxtImg
        alt="apple_icon"
        format="webp"
        loading="lazy"
        src="/images/logos/payment/apple.webp"
        class="w-[50px] h-[20px]"
      />
    </div>
    <Divider class="text-grey-secondary" />
    <div
      v-for="(condition, index) in textData.conditions.quantity"
      :key="index"
      class="flex gap-5 mt-2 text-[14px]"
    >
      <Checkbox
        v-model="optionsChecked[index as keyof typeof optionsChecked]"
        binary
        class=""
      />
      <div class="w-10/12">
        <span
          v-for="(text, index2) in textData.conditions.subSections"
          :key="index2"
          :class="addTextStyle(text)"
        >
          {{ $t(`${textData.section}conditions.condition_${index}.${text}`) }}
        </span>
      </div>
    </div>
    <div class="flex justify-center mt-5">
      <Button
        :disabled="!optionsChecked[0]"
        severity="secondary"
        :label="$t(`${textData.section}button`)"
      />
    </div>
  </div>
</template>
