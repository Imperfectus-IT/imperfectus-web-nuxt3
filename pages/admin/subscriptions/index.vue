<template>
  <div class="flex flex-col">
    <div class="lg:flex lg:flex-row lg:justify-between">
      <h4 class="font-recoleta-regular text-[30px]">Mis suscripciones</h4>
      <NuxtLink>
        <Button primary class="hidden lg:block " label="Añadir suscripción" />
      </NuxtLink>
    </div>
    <Subscription
      v-for="subscription in subscriptions"
      :subscription="subscription"
    />
  </div>
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
