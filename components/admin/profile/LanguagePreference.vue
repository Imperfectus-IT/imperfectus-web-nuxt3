<template>
  <Panel
    :header="$t('profile.language_preference.title')"
    class="lg:w-full"
    :pt="{
      title: 'font-recoleta-medium text-xl font-medium leading-5',
    }"
  >
    <div class="flex flex-col gap-3 mb-5">
      <p class="font-solina-extended-book text-sm mt-2 lg:mt-8">
        {{ $t("profile.language_preference.description") }}
      </p>
      <Dropdown
        v-if="isOpen"
        v-model="selectedLanguage"
        class="mt-4 lg:w-1/2"
        :options="languages"
        option-label="name"
        option-value="code"
      />
      <div class="flex flex-row gap-2 mt-5">
        <Button
          v-if="isOpen"
          class="w-[11.5rem] h-[3.125rem]"
          :label="$t('profile.language_preference.save_modify_language_button')"
          :pt="{ label: 'text-sm' }"
          outlined
          @click="handleUpdateLanguage"
        />
        <Button
          class="w-[8.5rem] h-[3.125rem]"
          :label="isOpen ? $t('profile.language_preference.cancel_modify_language_button') : $t('profile.language_preference.modify_language_button')"
          :pt="{ label: 'text-sm' }"
          outlined
          @click.prevent="handleToggle"
        />
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
const props = defineProps<{
  language: string
}>()
const emits = defineEmits(['update-language'])
const languages = [
  { name: 'Català', code: 'ca' },
  { name: 'Español', code: 'es' },
]
const { isOpen, handleToggle } = useToggle()
const selectedLanguage = ref(props.language)
const handleUpdateLanguage = () => {
  emits('update-language', selectedLanguage.value)
  selectedLanguage.value = props.language
  handleToggle()
}
watchEffect(() => {
  selectedLanguage.value = props.language
})
</script>
