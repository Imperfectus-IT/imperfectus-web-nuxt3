export const useUpdateProfileLanguageHandler = () => {
  const { t } = useI18n()
  const toast = useToast()
  const handleUpdateLanguage = async (userId: number, language: ProfileLanguage): Promise<void> => {
    const { executeUpdateProfileLanguage } = useUpdateProfileLanguage()
    const { successToast, errorToast } = useToastService()
    const { handleToggle } = useToggle()

    try {
      await executeUpdateProfileLanguage(userId, language)
      successToast(toast, t('adminProfileForm.languagePreference'), t('adminProfileForm.dataUpdated'))
      handleToggle()
    }
    catch (e) {
      console.error(e)
      errorToast(toast, t('profile.payment.deleteModal.title'), 'error')
      handleToggle()
    }
  }

  return {
    handleUpdateLanguage,
  }
}
