<template>
  <div
    class="border-green-tertiary border-[1px] rounded-lg p-4 font-solina-extended-book m-6"
  >
    <p>
      {{ $t("profile.my_acount.next_deliveries.paragraph_1") }}
    </p>
    <NuxtLink to="">
      <Button
        :label="$t('profile.my_acount.next_deliveries.handle_next_deliveries')"
        class="mt-3 mb-2"
      />
    </NuxtLink>
  </div>
</template>
