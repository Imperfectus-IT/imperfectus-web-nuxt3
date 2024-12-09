<script setup lang="ts">
const { personalDataForm, handleUpdatePersonalData } = useUpdatePersonalDataHandler()
const emit = defineEmits(['on-modify-data'])

const originalData = ref<PersonalData>({ ...personalDataForm.value })

const props = defineProps({
  data: {
    type: Object as PropType<PersonalData>,
    required: true,
  },
})

onMounted(() => {
  personalDataForm.value = props.data
})

const onSubmit = async () => {
  await handleUpdatePersonalData()
  emit('on-modify-data', personalDataForm.value)
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
    <form @submit.prevent="onSubmit">
      <div class="flex flex-col gap-2 mt-6">
        <label for="username">{{ $t('adminProfileForm.username') }}</label>
        <InputText
          id="username"
          v-model="personalDataForm.username"
          class="rounded-md"
          aria-describedby="username"
        />
      </div>
      <div class="flex flex-col gap-2 mt-6">
        <label for="username">{{ $t('adminProfileForm.email') }}</label>
        <InputText
          id="email"
          v-model="personalDataForm.email"
          class="rounded-md"
          aria-describedby="email"
        />
      </div>
      <div class="flex flex-col gap-3 lg:flex-row lg:justify-around lg:align-items-end lg:mt-10">
        <Button
          class="w-[11.5rem] h-[3.125rem]"
          type="submit"
          :label="$t('profile.personal_data.save_changes_button')"
          :pt="{ label: 'text-md' }"
          outlined
        />
        <Button
          class="w-[11.5rem] h-[3.125rem]"
          :label="$t('profile.personal_data.cancel_changes_button')"
          :pt="{ label: 'text-md' }"
          outlined
          @click.prevent="$emit('on-modify-data', originalData)"
        />
      </div>
    </form>
  </Panel>
</template>
