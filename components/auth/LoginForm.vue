<script setup lang="ts">
import {ref} from 'vue';

const identifier = ref('');
const password = ref('');
</script>

<template>
  <section class="flex flex-col items-center gap-1">
    <slot name="header" />
    <SocialButtons />
    <div class="flex justify-center items-center gap-x-1">
      <Divider class="w-[69px] opacity-50" />
      <span class="text-[10px] text-green-tertiary/50">{{ $t('socialProvider.loginWithEmail') }}</span>
      <Divider class="w-[69px] opacity-50" />
    </div>
    <div class="flex flex-col gap-5">
      <InputText
        v-model="identifier"
        size="small"
        class="rounded-xl"
        type="text"
        :placeholder="$t('loginForm.email')"
      />
      <Password
        v-model="password"
        :placeholder="$t('loginForm.password')"
      />
      <Button
        class="w-full"
        :label="$t('loginForm.login')"
        severity="secondary"
      />
      <Button
        :label="$t('loginForm.forgotPassword')"
        link
        :pt="{
          root: { class: 'px-0 py-0 text-start' },
          label: { class: 'text-[0.625rem] font-light underline' }
        }"
      />
      <Button
        :label="$t('orderStepAuth.hastAccount')"
        link
        :pt="{
          root: { class: 'px-0 py-0' },
          label: { class: 'text-base font-medium' }
        }"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>
