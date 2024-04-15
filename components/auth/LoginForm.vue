<script setup lang="ts">
import {watch} from "vue";

const {validationErrors, validateSchema} = useValidateLogin();
const {loginFormData, handleLogin} = useStrapiLogin();
const localePath = useLocalePath();

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
    <section class="px-10 md:px-[28%] lg:px-[35%] 2xl:px-[40%]">
        <slot name="header"/>
        <SocialButtons/>
        <div class="flex items-center text-center py-3 lg:py-8">
            <Divider class="w-[36%] md:w-[50%] lg:w-[35%] xl:w-[55%] 2xl:w-[65%] opacity-50"/>
            <span class="text-[10px] text-green-tertiary/50 w-full lg:w-4/5">{{
                    $t("socialProvider.loginWithEmail")
                }}</span>
            <Divider class="w-[36%] md:w-[50%] lg:w-[35%] xl:w-[55%] 2xl:w-[65%] opacity-50"/>
        </div>
        <form class="flex flex-col gap-y-4 lg:gap-y-8" @submit.prevent="submitLoginForm">
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
            <NuxtLink class="font-extended-book text-start lg:text-center" :to="localePath({ 'name': 'auth-recovery' })">
                <Button
                    :label="$t('loginForm.forgotPassword')"
                    link
                    :pt="{
                        root: { class: 'px-0 py-0 lg:h-3' },
                        label: { class: 'text-sm font-light underline' },
                    }"
                />
            </NuxtLink>
            <NuxtLink class="font-solina-extended-medium text-center">
                <Button
                    :label="$t('orderStepAuth.hastAccount')"
                    :pt="{
                        root: { class: 'px-0 py-0' },
                        label: { class: 'text-base underline' },
                    }"
                />
            </NuxtLink>
        </form>
    </section>
</template>
