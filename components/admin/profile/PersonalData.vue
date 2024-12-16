<script setup lang="ts">
const { personalData } = defineProps<{
  personalData: PersonalData
}>()

const emit = defineEmits(['on-modify-data', 'on-modify-password'])

const items = [
  {
    id: useId(),
    label: personalData.username,
    icon: 'mdi mdi-account-circle-outline',
  },
  {
    id: useId(),
    label: personalData.email,
    icon: 'mdi mdi-email-outline',
  },
]
</script>

<template>
  <Panel
    :header="$t('adminProfileForm.title')"
    class="lg:w-full"
    :pt="{
      title: 'font-recoleta-medium text-xl font-medium leading-5 lg:-mb-5',
    }"
  >
    <Divider class="lg:invisible" />
    <div
      v-for="item in items"
      :key="item.id"
      class="flex items-center gap-3 mb-5 lg:mb-10 lg:gap-5"
    >
      <span :class="['text-lg lg:text-[2rem]', item.icon]" />
      <p class="font-solina-extended-book text-md lg:text-lg overflow-hidden">
        {{ item.label }}
      </p>
    </div>
    <div class="flex flex-col gap-3 lg:flex-row lg:justify-around lg:align-items-end lg:mt-10">
      <Button
        class="w-[11.5rem] h-[3.125rem]"
        :label="$t('profile.personal_data.modify_data_button')"
        :pt="{ label: 'text-md' }"
        outlined
        @click.prevent="emit('on-modify-data', personalData)"
      />
      <Button
        class="w-[11.5rem] h-[3.125rem]"
        :label="$t('profile.personal_data.change_password_button')"
        :pt="{ label: 'text-md' }"
        outlined
        @click.prevent="emit('on-modify-password')"
      />
    </div>
  </Panel>
</template>
