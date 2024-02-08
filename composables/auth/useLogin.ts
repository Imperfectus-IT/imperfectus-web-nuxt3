import { ref } from "vue";

export const useStrapiLogin = () => {
  const loginFormData = ref({
    identifier: "",
    password: "",
  });

  const { login } = useStrapiAuth();

  const submitLoginForm = async () => {
    try {
      return await login({
        identifier: loginFormData.value.identifier,
        password: loginFormData.value.password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return { loginFormData, submitLoginForm };
};
