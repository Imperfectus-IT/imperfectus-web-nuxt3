<template>
  <Panel
    :header="$t('profile.language_preference.title')"
    class="lg:w-full"
    :pt="{
      title: 'font-recoleta-medium text-xl font-medium leading-5',
    }"
  >
    <div class="flex flex-col gap-3 ">
      <p class="font-solina-extended-book text-md mt-2 lg:mt-8">
        {{ $t("profile.language_preference.description") }}
      </p>
      <Dropdown
        v-if="isOpen"
        v-model="selectedLanguage"
        class="mt-4"
        :options="languages"
        option-label="name"
        option-value="code"
      />
      <div class="flex flex-row gap-2 mt-5">
        <Button
          v-if="isOpen"
          :label="$t('profile.language_preference.save_modify_language_button')"
          :pt="{ label: 'text-[16px] px-1' }"
          outlined
          @click.prevent="handleUpdateLanguage"
        />
        <Button
          :label="isOpen ? $t('profile.language_preference.cancel_modify_language_button') : $t('profile.language_preference.modify_language_button')"
          :pt="{ label: 'text-[16px] lg:w-1/5', root: 'border-[1px] py-3 px-4 rounded-lg' }"
          outlined
          @click.prevent="handleToggle"
        />
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
const { selectedLanguage } = useProfileState()
const { languages } = useGetAllLanguagesHandler()
const { isOpen, handleToggle } = useToggle()
const { handleUpdateLanguage } = useUpdateProfileLanguageHandler()
</script>
