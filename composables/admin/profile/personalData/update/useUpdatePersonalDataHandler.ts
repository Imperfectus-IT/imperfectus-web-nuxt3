export const useUpdatePersonalDataHandler = () => {
  const { t } = useI18n()
  const toast = useToast()
  const { personalData: personalDataForm } = useProfileState()
  const handleUpdatePersonalData = async () => {
    const user = useStrapiUser()
    const { executeUpdatePersonalData } = useUpdatePersonalData()
    const { successToast, errorToast } = useToastService()

    try {
      await executeUpdatePersonalData(Number(user?.value?.id), toValue(personalDataForm))
      successToast(toast, t('adminProfileForm.personalData'), t('adminProfileForm.dataUpdated'))
      console.info('after, personalDataForm:', personalDataForm)
    }
    catch (e) {
      console.error(e)
      errorToast(toast, t('adminProfileForm.personalData'), e)
    }
  }

  return {
    personalDataForm,
    handleUpdatePersonalData,
  }
}
