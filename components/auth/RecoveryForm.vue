<script setup lang="ts">
const { validationErrors, validateSchema } = useValidateRecovery();
const { recoveryFormData, handleRecovery } = useStrapiRecovery();
const localePath = useLocalePath();

const step = ref("email");

const submitRecoveryForm = async () => {
  try {
    validateSchema(recoveryFormData.value);

    if (!validationErrors.value) {
      const isOk = await handleRecovery();
      if (isOk) {
        step.value = "password";
      }
    }
  } catch (err) {
    console.error("Error submitting recovery form:", err);
  }
};
</script>

<template>
  <section class="px-10 md:px-[28%] lg:px-[35%] 2xl:px-[40%]">
    <h3>{{ $t("recoveryForm.recoverPassword") }}</h3>

    <transition name="fade" mode="out-in">
      <form
        v-if="step === 'email'"
        key="email"
        class="flex flex-col gap-y-4 lg:gap-y-8"
        @submit.prevent="submitRecoveryForm"
      >
        <TKField :errors="validationErrors?.email?._errors">
          <InputText
            v-model="recoveryFormData.email"
            type="text"
            size="small"
            class="rounded-xl"
            :placeholder="$t('recoveryForm.email')"
            :invalid="!!validationErrors?.email?._errors?.length"
          />
        </TKField>
        <TKField>
          <Button
            class="w-full self-center lg:w-[9rem]"
            severity="secondary"
            type="submit"
          >
            {{ $t("recoveryForm.submit") }}
          </Button>
        </TKField>
      </form>
    </transition>

    <div class="mt-8 underline font-extended-book">
      <nuxt-link :to="localePath('auth-login')">
        <small>{{ $t("recoveryForm.back") }}</small>
      </nuxt-link>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
