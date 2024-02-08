import { z } from "zod";
import { ref } from "vue";

export const useValidateLogin = () => {
  const loginFormSchema = z.object({
    identifier: z.string().email().min(6),
    password: z.string(),
  });

  type LoginFormSchema = z.infer<typeof loginFormSchema>;
  const validationErrors = ref<z.ZodFormattedError<LoginFormSchema> | null>(
    null,
  );

  const validateSchema = (form: LoginFormSchema) => {
    const validSchema = loginFormSchema.safeParse(form);

    if (!validSchema.success) {
      validationErrors.value = validSchema.error.format();
    } else {
      validationErrors.value = null;
    }
  };

  return { validationErrors, validateSchema };
};
