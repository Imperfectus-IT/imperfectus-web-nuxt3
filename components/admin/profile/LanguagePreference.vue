<template>
  <Panel :header="$t('profile.language_preference.title')" class="lg:w-full">
    <div class="flex flex-col gap-3 mb-5">
      <p class="font-solina-extended-book text-sm mt-8">
        {{ $t('profile.language_preference.description') }}
      </p>
      <Button
          class="w-[11.5rem] h-[3.125rem]" :label="$t('profile.language_preference.modify_language_button')"
          :pt="{ label: 'text-sm' }" outlined
      />
    </div>
  </Panel>
</template>