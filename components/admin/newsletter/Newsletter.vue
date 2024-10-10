<template>
  <div class="w-full">
    <h4 class="font-recoleta-regular text-[30px] lg:text-[40px]">
      {{ $t(`${textData}title`) }}
    </h4>
    <div
      class="lg:flex lg:flex-row"
    >
      <UnsubscribedPanel
        v-if="isUserSubscribed"
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
import type { DomainUser } from '~/composables/shared/user/types/DomainUser.ts'
import { useUpdateUser } from '~/composables/shared/user/application/update/useUpdateUser.ts'

const props = defineProps<{
  user: DomainUser
}>()
const { executeSubscribeToNewsletter, executeUnsubscribeFromNewsletter } = useUpdateUser()

const textData = 'newsletter.'
const handleSubscribeToNewsletter = async () => await executeSubscribeToNewsletter(props.user)
const handleUnsubscribeToNewsletter = async () => await executeUnsubscribeFromNewsletter(props.user)
const isUserSubscribed = computed(() => !props.user.marketingInfoComm)
</script>
