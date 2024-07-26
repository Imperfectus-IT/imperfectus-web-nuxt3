export const useUpdateUserHandler = () => {
  const toast = useToast()
  const { successToast, errorToast } = useToastService()
  const { executeSubscribeToNewsletter, executeUnsubscribeFromNewsletter, executeUpdatePersonalData } = useUpdateUser()
  const handleSubscribeToNewsletter = async (email: string, language: string) => {
    await executeSubscribeToNewsletter(email, language)
  }
  const handleUnsubscribeFromNewsletter = async (email: string, language: string) => {
    await executeUnsubscribeFromNewsletter(email, language)
  }
  const handleUpdatePersonalData = async (id: number, personalData: PersonalData, t: ComposerTranslation) => {
    try {
      await executeUpdatePersonalData(id, personalData)
      successToast(toast, t('profile.successToast.title'), t('profile.successToast.description'))
    }
    catch (error) {
      console.error(error)
      errorToast(toast, t('profile.errorToast.title'), t('profile.errorToast.description'))
    }
  }
  return {
    handleSubscribeToNewsletter,
    handleUnsubscribeFromNewsletter,
    handleUpdatePersonalData,
  }
}
