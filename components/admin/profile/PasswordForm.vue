<script setup lang="ts">
const { t } = useI18n()

const form = ref({
  currentPassword: '',
  newPassword: '',
  newPasswordConfirmation: '',
})
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
    <div>
      <!--      adminProfileForm.currentPassword
      adminProfileForm.newPassword
      adminProfileForm.newPasswordConfirmation -->
      <div class="flex flex-col gap-2 mt-6">
        <label for="currentPassword">{{ $t('adminProfileForm.currentPassword') }}</label>
        <Password
          id="currentPassword"
          v-model="form.currentPassword"
          class="rounded-md"
          aria-describedby="currentPassword"
          :toggle-mask="true"
        />
      </div>

      <div class="flex flex-col gap-2 mt-6">
        <label for="newPassword">{{ $t('adminProfileForm.newPassword') }}</label>
        <Password
          id="newPassword"
          v-model="form.newPassword"
          class="rounded-md"
          aria-describedby="newPassword"
          :toggle-mask="true"
        />
      </div>

      <div class="flex flex-col gap-2 mt-6">
        <label for="newPasswordConfirmation">{{ $t('adminProfileForm.newPasswordConfirmation') }}</label>
        <Password
          id="newPasswordConfirmation"
          v-model="form.newPasswordConfirmation"
          class="rounded-md"
          aria-describedby="newPasswordConfirmation"
          :toggle-mask="true"
        />
      </div>
    </div>
  </Panel>
</template>

<style scoped lang="scss">

</style>
