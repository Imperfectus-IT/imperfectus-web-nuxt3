<script setup lang="ts">
import { ref } from "vue";

const identifier = ref("");
const password = ref("");

const { login } = useStrapiAuth();

const submitLoginForm = async () => {
  try {
    const user = await login({
      identifier: identifier.value,
      password: password.value,
    });
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <section class="flex flex-col items-center gap-1">
    <slot name="header" />
    <SocialButtons />
    <div class="flex flex-col-3 justify-center items-center gap-x-1">
      <Divider class="opacity-50" />
      <span class="text-[10px] text-green-tertiary/50">{{
        $t("socialProvider.loginWithEmail")
      }}</span>
      <Divider class="opacity-50" />
    </div>
    <form class="flex flex-col gap-y-4" @submit.prevent="submitLoginForm">
      <InputText
        v-model="identifier"
        size="small"
        class="rounded-xl"
        type="text"
        :placeholder="$t('loginForm.email')"
        invalid
      />
      <InputText
        v-model="password"
        size="small"
        class="rounded-xl"
        type="password"
        :placeholder="$t('loginForm.password')"
      />
      <Button
        class="w-full"
        :label="$t('loginForm.login')"
        severity="secondary"
        type="submit"
      />
      <Button
        :label="$t('loginForm.forgotPassword')"
        link
        :pt="{
          root: { class: 'px-0 py-0 text-start' },
          label: { class: 'text-[0.625rem] font-light underline' },
        }"
      />
      <Button
        :label="$t('orderStepAuth.hastAccount')"
        link
        :pt="{
          root: { class: 'px-0 py-0' },
          label: { class: 'text-base font-medium underline' },
        }"
      />
    </form>
  </section>
</template>
