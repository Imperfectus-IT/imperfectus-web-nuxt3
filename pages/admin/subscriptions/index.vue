<template>
  <h4 class="font-recoleta-regular text-[30px]">Mis suscripciones</h4>
  <Subscription
    v-for="subscription in subscriptions"
    :subscription="subscription"
  />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

defineI18nRoute({
  paths: {
    es: "/mi-cuenta/suscripciones/",
    ca: "/el-meu-compte/subscripcions/",
  },
});

const { subscriptions } = useGetSubscriptionsHandler();

watch(subscriptions, () =>
  console.log("subscriptions", JSON.parse(JSON.stringify(subscriptions.value)))
);
</script>
