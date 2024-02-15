<script setup lang="ts">
import {watch} from "vue";

const {validationErrors, validateSchema} = useValidateLogin();
const {loginFormData, handleLogin} = useStrapiLogin();

watch(loginFormData.value, (newValue) => {
    validateSchema(newValue);
});

const emit = defineEmits<{
    (e: "login"): void;
}>();

const submitLoginForm = async () => {
    try {
        validateSchema(loginFormData.value);

        if (!validationErrors.value) {
            await handleLogin();
        }

        emit("login");
    } catch (err) {
        console.error(err);
    }
};
</script>

<template>
    <section class="px-10 lg:px-96">
        <slot name="header"/>
        <SocialButtons/>
        <div class="flex items-center text-center py-3">
            <Divider class="w-divider opacity-50"/>
            <span class="text-[10px] text-green-tertiary/50 w-full">{{
                    $t("socialProvider.loginWithEmail")
                }}</span>
            <Divider class="w-divider opacity-50"/>
        </div>
        <form class="flex flex-col gap-y-4" @submit.prevent="submitLoginForm">
            <TKField :errors="validationErrors?.identifier?._errors">
                <InputText
                    v-model="loginFormData.identifier"
                    size="small"
                    class="rounded-xl"
                    type="text"
                    :placeholder="$t('loginForm.email')"
                    :invalid="!!validationErrors?.identifier?._errors?.length"
                />
            </TKField>
            <TKField :errors="validationErrors?.password?._errors">
                <InputText
                    v-model="loginFormData.password"
                    size="small"
                    class="rounded-xl"
                    type="password"
                    :placeholder="$t('loginForm.password')"
                    :invalid="!!validationErrors?.password?._errors?.length"
                />
            </TKField>
            <div class="text-center">
                <Button
                    class="w-full lg:w-[9rem]"
                    :label="$t('loginForm.login')"
                    severity="secondary"
                    type="submit"
                />
            </div>
            <Button
                :label="$t('loginForm.forgotPassword')"
                link
                :pt="{
          root: { class: 'px-0 py-0 text-start lg:text-center' },
          label: { class: 'text-[0.625rem] font-light underline' },
        }"
            />
            <Button
                :label="$t('orderStepAuth.hastAccount')"
                :pt="{
          root: { class: 'px-0 py-0' },
          label: { class: 'text-base font-medium underline' },
        }"
            />
        </form>
    </section>
</template>
<style scoped lang="scss">
.w-divider {
    width: 40%;
    @media (min-width: 768px) {
        width: 100%;
    }
    @media (min-width: 1024px) {
        width: 100%;
    }
}
</style>