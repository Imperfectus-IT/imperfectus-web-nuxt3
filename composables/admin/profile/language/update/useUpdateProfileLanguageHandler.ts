export const useUpdateProfileLanguageHandler = () => {
    const { t } = useI18n()
    const toast = useToast()
    const handleUpdateLanguage = async (): Promise<void> => {
        const { selectedLanguage } = useProfileState()
        const user = useStrapiUser()
        const { executeUpdateProfileLanguage } = useUpdateProfileLanguage()
        const { successToast, errorToast } = useToastService()
        const {  handleToggle } = useToggle()

        try {
            await executeUpdateProfileLanguage(Number(user?.value?.id), selectedLanguage.value)
            successToast(toast, t('adminProfileForm.languagePreference'), t('adminProfileForm.dataUpdated'))
            handleToggle()
        }
        catch (e) {
            console.error(e)
            errorToast(toast, t('profile.payment.deleteModal.title'), e)
            handleToggle()
        }
    }

    return {
        handleUpdateLanguage
    }
}
