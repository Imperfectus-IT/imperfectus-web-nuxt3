<template>
  <GiftCardDescriptions />
  <GiftCardCreate />
  <GiftCardDoubts />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocalStorageGiftCardRepository } from '~/composables/gift-card/infrastructure/useLocalStorageGiftCardRepository.ts'

const { setGiftCard } = useLocalStorageGiftCardRepository();

setGiftCard({
  amount: 0,
  message: '',
  recipientEmail: '',
  recipientName: '',
  senderName: '',
});
const { t } = useI18n();
useHead({
  title: t('gift-card-create.title'),
  meta: [
    {
      name: 'description',
      content: t('git-card-create.description'),
    },
  ],
});

defineI18nRoute({
  paths: {
    es: '/tarjeta-regalo-digital/crear',
    ca: '/targeta-regal-digital/crear',
  },
})
</script>
