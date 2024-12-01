<template>
  <div class="bg-green-quaternary mt-12 px-8 pb-14 lg:px-20">
    <h4 class="text-[56px] font-recoleta-regular leading-[52px] pt-12 !whitespace-normal lg:mb-12">
      {{ $t("gift-card.create.title") }}
    </h4>
    <p class="text-[20px] font-bold my-6">
      {{ $t("gift-card.create.choose_design") }}
    </p>

    <GiftCardCarousel @update-design-id="updateDesignId" />
    <GiftCardCreateForm
      @form-submit="submitForm"
    />
  </div>
</template>

<script setup lang="ts">
import { useLocalStorageGiftCardRepository } from '~/composables/gift-card/infrastructure/useLocalStorageGiftCardRepository.ts'
import { createEmptyGiftCard } from '~/composables/gift-card/domain/GiftCard.ts'

const { setGiftCardPurchase } = useLocalStorageGiftCardRepository()

const router = useRouter()
const localePath = useLocalePath()
const userLoggedIn = useStrapiUser()
const { giftCardPurchase } = useGiftCardPurchaseState()

const submitForm = () => {
  const isEmailBillingSet = giftCardPurchase.value.billing.billingEmail !== ''
  giftCardPurchase.value.items.push(giftCardPurchase.value.currentItem)
  giftCardPurchase.value.currentItem = createEmptyGiftCard()
  setGiftCardPurchase(giftCardPurchase.value)
  if (!userLoggedIn.value) {
    router.push(localePath('auth-login'))
  }
  else {
    !isEmailBillingSet ? router.push(localePath('gift-card-gift-card-billing-form')) : router.push(localePath('gift-card-gift-card-payment'))
  }
}

const updateDesignId = (designId: number) => {
  giftCardPurchase.value.currentItem.designId = designId
}
</script>
