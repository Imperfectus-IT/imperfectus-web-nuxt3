<template>
  <div class="bg-green-quaternary mt-12 px-8 pb-14 lg:px-20">
    <h4 class="text-[56px] font-recoleta-regular leading-[52px] pt-12 !whitespace-normal">
      {{ $t("gift-card.create.title") }}
    </h4>
    <p class="text-[20px] font-bold my-6">
      {{ $t("gift-card.create.choose_design") }}
    </p>
    <GiftCardCarousel @update-design-id="(designId) => updateDesignId(designId)" />
    <GiftCardCreateForm @form-updated="(payload) => updateFormData(payload)" />

    <div class="mt-8">
      <span class="text-[20px]">{{ $t("gift-card.create.form.description") }}</span>
      <NuxtLink :to="localePath({ name: 'legal-conditions' })">
        <span class="underline text-[20px]">{{ " " + $t("gift-card.create.form.description_link") }}</span>
      </NuxtLink>
    </div>
    <Button
      :pt="{
        root: 'bg-green-primary w-2/3 mt-12 font-bold py-1 lg:py-2 lg:w-1/4 rounded-md disabled:opacity-50',
      }"
      :label="$t('gift-card.create.form.button')"
      :disabled="isFormErrored"
      @click="submitForm"
    />
  </div>
</template>

<script setup lang="ts">
import type { GiftCardForm } from './types/types'

const router = useRouter()
const localePath = useLocalePath()
const userLoggedIn = useStrapiUser()
const isFormErrored = ref<boolean>(true)
const { giftCard } = useCreateGiftCardHandler()

const submitForm = () => {
  if (!userLoggedIn.value) {
    router.push(localePath('auth-login'))
  }
  else {
    router.push(localePath('gift-card-gift-card-billing-form'))
  }
}

const updateFormData = (payload: { formData: GiftCardForm, errors: any }) => {
  setIsFormErrored(payload.errors)
  giftCard.value[0] = { ...giftCard.value[0], ...payload.formData }
}

const updateDesignId = (designId: number) => {
  giftCard.value[0].designId = designId
}

const setIsFormErrored = (formErrors: any) => {
  isFormErrored.value = formErrors.value
}
</script>
