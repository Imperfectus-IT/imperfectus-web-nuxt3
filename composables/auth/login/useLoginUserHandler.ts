export const useLoginUserHandler = () => {
  const { userLogin } = useAuthState()
  const { executeLoginUser } = useLoginUser()
  const { validationErrors, setValidationErrorsLoginResponse, validateSchema } = useValidateLogin()

  const handleLoginUser = async (): Promise<void> => {
    try {
      validateSchema(userLogin.value)

      if (!validationErrors.value) {
        await executeLoginUser(userLogin.value)
        resetLoginUser()
      }
    }
    catch (err: any) {
      setValidationErrorsLoginResponse(err)
      console.error(err)
    }
  }

  const resetLoginUser = (): void => {
    userLogin.value = {
      identifier: '',
      password: '',
    }
  }

  return {
    userLogin,
    handleLoginUser,
  }
}
