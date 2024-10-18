<template>
  <div class="w-full">
    <h4 class="font-recoleta-regular text-[30px] lg:text-[40px]">
      {{ $t(`${textData}title`) }}
    </h4>
    <div
      class="lg:flex lg:flex-row"
    >
      <UnsubscribedPanel
        v-if="!isUserSubscribed"
        :text-data="textData"
        @subscribe="handleSubscribeToNewsletter"
      />
      <SubscribedPanel
        v-else
        :text-data="textData"
        @unsubscribe="handleUnsubscribeToNewsletter"
      />
      <NuxtImg
        src="/images/admin/newsletter/newsletter.webp"
        alt="newsletter"
        format="webp"
        loading="lazy"
        class="w-full mt-8 lg:order-1 lg:w-[500px]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUpdateUser } from '~/composables/shared/user/application/update/useUpdateUser.ts'
import { useUserState } from '~/composables/shared/user/application/useUserState.ts'

const { user } = useUserState()
const { executeSubscribeToNewsletter, executeUnsubscribeFromNewsletter } = useUpdateUser()
const textData = 'newsletter.'
const handleSubscribeToNewsletter = async () => await executeSubscribeToNewsletter(user.value)
const handleUnsubscribeToNewsletter = async () => await executeUnsubscribeFromNewsletter(user.value)
const isUserSubscribed = computed(() => user.value.marketingInfoComm)
</script>
