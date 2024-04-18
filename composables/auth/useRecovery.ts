import { ref } from "vue";

export const useStrapiRecovery = () => {
  const recoveryFormData = ref({
    email: "",
    password: "",
    configPassword: "",
    code: "",
  });

  const { forgotPassword } = useStrapiAuth();

  const handleRecovery = async (): Promise<Boolean> => {
    await forgotPassword({
      email: recoveryFormData.value.email,
    });

    return true;
  };

  return { recoveryFormData, handleRecovery };
};
