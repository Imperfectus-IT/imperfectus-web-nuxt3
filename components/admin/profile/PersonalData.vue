<script setup lang="ts">
import {usePersonalDataFactory} from "~/composables/admin/profile/personalData/usePersonalDataFactory.ts";

const { personalData } = usePersonalDataFactory();

const items = [
  {
    id: useId(),
    label: personalData.username,
    icon: "mdi mdi-account-circle-outline",
  },
  {
    id: useId(),
    label: personalData.email,
    icon: "mdi mdi-email-outline",
  }
]
</script>

<template>
  <Panel :header="$t('adminProfileForm.title')" class="lg:w-full">
    <Divider/>
    <div v-for="item in items" :key="item.id" class="flex items-center gap-3 mb-5">
      <span :class="['text-lg', item.icon]"/>
      <p class="font-solina-extended-book text-sm">{{ item.label }}</p>
    </div>
    <div class="flex flex-col gap-3">
      <Button
          class="w-[11.5rem] h-[3.125rem]" :label="$t('profile.personal_data.modify_data_button')"
          :pt="{ label: 'text-sm' }" outlined/>
      <Button
          class="w-[11.5rem] h-[3.125rem]" :label="$t('profile.personal_data.change_password_button')"
          :pt="{ label: 'text-sm' }" outlined/>
    </div>
  </Panel>
</template>