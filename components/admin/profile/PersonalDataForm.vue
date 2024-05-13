<script setup lang="ts">
const { personalData } = defineProps<{
  personalData: PersonalData
}>()
const personalDataForm = ref({
  username: personalData.username,
  email: personalData.email,
})

const handleSubmit = () => {
  console.log(personalDataForm.value)
}
</script>

<template>
  <Panel
      :header="$t('adminProfileForm.title')"
      class="lg:w-full"
      :pt="{
      title: 'font-recoleta-medium text-xl font-medium leading-5',
    }"
  >
    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col gap-2 mt-6">
        <label for="username">{{ $t('adminProfileForm.username') }}</label>
        <InputText id="username" class="rounded-md" v-model="personalDataForm.username" aria-describedby="username" />
      </div>
      <div class="flex flex-col gap-2 mt-6">
        <label for="username">{{ $t('adminProfileForm.email') }}</label>
        <InputText id="email" class="rounded-md" v-model="personalDataForm.email" aria-describedby="email" />
      </div>
      <div class="flex flex-col gap-3 lg:flex-row lg:justify-around lg:align-items-end lg:mt-10">
        <Button
            class="w-[11.5rem] h-[3.125rem]"
            type="submit"
            :label="$t('profile.personal_data.save_changes_button')"
            :pt="{ label: 'text-sm' }"
            outlined
        />
        <Button
            class="w-[11.5rem] h-[3.125rem]"
            :label="$t('profile.personal_data.cancel_changes_button')"
            :pt="{ label: 'text-sm' }"
            outlined
            @click.prevent="$emit('on-modify-data')"
        />
      </div>
    </form>
  </Panel>
</template>
