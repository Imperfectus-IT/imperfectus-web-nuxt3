<template>
  <div v-if="!subscription">
    sssss
  </div>
  <div
    v-else
    class="px-6 lg:max-w-[1200px] mx-auto"
  >
    <h4 class="font-recoleta-regular text-[43px]">
      {{ $t(`${textData}title`) }}
    </h4>
    <SubscriptionHeader :subscription="subscription" />
    <p class="mt-7">
      {{ $t(`${textData}description`) }}
    </p>

    <!--    Date picker -->
    <SubscriptionDetails :subscription="subscription" />
  </div>
</template>

<script setup lang='ts'>
defineProps<{
  subscription: Subscription
}>()

const textData = 'subscriptions.subscription.'
</script>
