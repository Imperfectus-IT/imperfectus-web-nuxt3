import type { ComposerTranslation } from 'vue-i18n'
import { useUpdateUserLanguage } from '~/composables/shared/user/application/update/updateLanguage/useUpdateUserLanguage.ts'

export const useUpdateUserLanguageHandler = () => {
  const { handleToggle } = useToggle()
  const toast = useToast()
  const { successToast, errorToast } = useToastService()
  const { executeUpdateUserLanguage } = useUpdateUserLanguage()
  const handleUpdateUserLanguage = async (id: number, language: string, t: ComposerTranslation) => {
    try {
      await executeUpdateUserLanguage(id, language)
      successToast(toast, t('adminProfileForm.languagePreference'), t('adminProfileForm.dataUpdated'))
      handleToggle()
    }
    catch (error) {
      console.error(error)
      errorToast(toast, t('profile.payment.deleteModal.title'), t('profile.payment.deleteModal.error'))
      handleToggle()
    }
  }
  return {
    handleUpdateUserLanguage,
  }
}
