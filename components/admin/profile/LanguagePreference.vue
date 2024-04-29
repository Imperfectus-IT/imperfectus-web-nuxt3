<template>
  <Panel :header="$t('profile.language_preference.title')" class="lg:w-full">
    <div class="flex flex-col gap-3 mb-5">
      <p class="font-solina-extended-book text-sm mt-2 lg:mt-8">
        {{ $t("profile.language_preference.description") }}
      </p>
      <Dropdown
        v-if="isFormShown"
        v-model="selectedLanguage"
        class="mt-4"
        :options="languages"
        option-label="name"
        option-value="code"
      />
      <div class="flex flex-row gap-2 mt-5">
        <Button
        v-if="isFormShown"
        class="w-[11.5rem] h-[3.125rem]"
        :label="$t('profile.language_preference.save_modify_language_button')"
        :pt="{ label: 'text-sm' }"
        outlined
        @click="saveLanguage"
      />
      <Button
        class="w-[8.5rem] h-[3.125rem]"
        :label="isFormShown ? $t('profile.language_preference.cancel_modify_language_button') : $t('profile.language_preference.modify_language_button')"
        :pt="{ label: 'text-sm' }"
        outlined
        @click="toggleForm"
      />
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">

const props = defineProps<{
  userLanguage: "ca" | "es";
}>();

const emit = defineEmits(['save_language'])

const isFormShown = ref(false);
const selectedLanguage = ref(props.userLanguage);

const toggleForm = () => {
  isFormShown.value = !isFormShown.value;
};

const saveLanguage = () => {
  emit('save_language', selectedLanguage.value);
  isFormShown.value = false;
}


const languages = ref([
  {
    name: "Català",
    code: "ca",
  },
  {
    name: "Castellano",
    code: "es",
  },
]);
</script>
