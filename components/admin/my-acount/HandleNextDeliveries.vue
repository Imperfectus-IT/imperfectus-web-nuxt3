<template>
  <div
    class="border-green-tertiary border-[1px] rounded-lg p-4 font-solina-extended-book m-6 lg:border-0"
  >
  <h4 class='hidden lg:block font-recoleta-regular lg:text-[25px]'>¿Quieres gestionar las entregas de esta suscripción?</h4>
    <p>
      {{ $t("profile.my_acount.next_deliveries.paragraph_1") }}
    </p>
    <NuxtLink :to="`admin/subscriptions/upcoming_orders/${subscriptionId}`">
      <Button
        :label="$t('profile.my_acount.next_deliveries.handle_next_deliveries')"
        class="mt-3 mb-2 lg:mt-5"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  subscriptionId: number;
}>();

</script>



<!-- :to="
              localePath({
                name: 'admin-subscriptions-id',
                params: { id: subscriptionId }
              }) -->
