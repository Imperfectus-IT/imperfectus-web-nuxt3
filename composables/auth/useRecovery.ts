import { ref } from 'vue'

export const useStrapiRecovery = () => {
  const recoveryFormData = ref({
    email: '',
    password: '',
    confirmPassword: '',
    code: '',
  })

  const { forgotPassword, resetPassword } = useStrapiAuth()

  const handleRecovery = async (): Promise<boolean> => {
    await forgotPassword({
      email: recoveryFormData.value.email,
    })

    return true
  }

  const handleReset = async (): Promise<boolean> => {
    await resetPassword({
      code: recoveryFormData.value.code,
      password: recoveryFormData.value.password,
      passwordConfirmation: recoveryFormData.value.confirmPassword,
    })

    return true
  }

  return { recoveryFormData, handleRecovery, handleReset }
}
