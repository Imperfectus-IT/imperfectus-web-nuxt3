import { ref } from "vue";

export const useStrapiRecovery = () => {
  const recoveryFormData = ref({
    email: "",
    password: "",
    confirmPassword: "",
    code: "",
  });

  const { forgotPassword, resetPassword } = useStrapiAuth();

  const handleRecovery = async (): Promise<Boolean> => {
    await forgotPassword({
      email: recoveryFormData.value.email,
    });

    return true;
  };

  const handleReset = async (): Promise<Boolean> => {
    await resetPassword({
      code: recoveryFormData.value.code,
      password: recoveryFormData.value.password,
      passwordConfirmation: recoveryFormData.value.confirmPassword,
    });

    return true;
  };

  return { recoveryFormData, handleRecovery, handleReset };
};
