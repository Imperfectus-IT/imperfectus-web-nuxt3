import type { RegisterUser } from '~/composables/shared/auth/domain/Auth.ts'

export const useRegisterUserHandler = () => {
  const { registerUser } = useAuthState()
  const { executeRegisterUser } = useRegisterUser()
  const { validationErrors, setValidationErrorsRegisterResponse, validateSchema } = useValidateRegisterUser()
  const { locale } = useI18n()
  const registerUserResponseFactory = (data: RegisterUser): RegisterUser => {
    return {
      ...data,
      language: locale.value,
    }
  }

  const handleRegisterUser = async (): Promise<void> => {
    try {
      validateSchema(registerUser.value)

      if (!validationErrors.value) {
        const data: RegisterUser = registerUserResponseFactory(registerUser.value)
        await executeRegisterUser(data)
        resetLoginUser()
      }
    }
    catch (err: any) {
      setValidationErrorsRegisterResponse(err)
      console.error(err)
    }
  }

  const resetLoginUser = (): void => {
    registerUser.value = {
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      talkualLegalBasis: '',
      marketingInfoComm: '',
      language: 'es',
    }
  }

  return {
    registerUser,
    handleRegisterUser,
  }
}
