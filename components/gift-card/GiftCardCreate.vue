<template>
  <div class="bg-green-quaternary mt-12 px-8 pb-14 lg:px-20">
    <h4 class="text-[56px] font-recoleta-regular leading-[52px] pt-12 !whitespace-normal lg:mb-12">
      {{ $t("gift-card.create.title") }}
    </h4>
    <p class="text-[20px] font-bold my-6">
      {{ $t("gift-card.create.choose_design") }}
    </p>

    <GiftCardCarousel @update-design-id="updateDesignId" />
    <GiftCardCreateForm @form-updated="updateFormData" />

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
      :disabled="isFormErrored"
      @click="submitForm"
    />
  </div>
  {{ giftCardPurchase }}
</template>

<script setup lang="ts">
import type { GiftCardForm } from './types/types'
import { useLocalStorageGiftCardRepository } from '~/composables/gift-card/infrastructure/useLocalStorageGiftCardRepository.ts'

const { setGiftCardPurchase, getGiftCardPurchase } = useLocalStorageGiftCardRepository()

const router = useRouter()
const localePath = useLocalePath()
const userLoggedIn = useStrapiUser()
const isFormErrored = ref<boolean>(true)
const { giftCardPurchase } = useGiftCardPurchaseState()

onMounted(() => {
  const giftCardPurchaseLocalStorage = getGiftCardPurchase()
  giftCardPurchase.value = giftCardPurchaseLocalStorage ? giftCardPurchaseLocalStorage : giftCardPurchase.value
})
const submitForm = () => {
  if (!userLoggedIn.value) {
    router.push(localePath('auth-login'))
  }
  else {
    router.push(localePath('gift-card-gift-card-billing-form'))
    setGiftCardPurchase(giftCardPurchase.value)
  }
}

const updateFormData = (payload: { formData: GiftCardForm, errors: any }) => {
  setIsFormErrored(payload.errors)
  giftCardPurchase.value.currentItem = {
    uuid: giftCardPurchase.value.currentItem.uuid,
    designId: giftCardPurchase.value.currentItem.designId,
    ...payload.formData,
  }
}

const updateDesignId = (designId: number) => {
  giftCardPurchase.value.currentItem.designId = designId
}
//
const setIsFormErrored = (formErrors: any) => {
  isFormErrored.value = formErrors.value
}
</script>
