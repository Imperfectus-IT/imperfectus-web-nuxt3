// export const useUpdatePersonalDataHandler = () => {
//   const { t } = useI18n()
//   const toast = useToast()
//   const { personalData: personalDataForm } = useProfileState()
//   const handleUpdatePersonalData = async () => {
//     const user = useStrapiUser()
//     const { executeUpdatePersonalData } = useUpdatePersonalData()
//     const { successToast, errorToast } = useToastService()
//
//     try {
//       await executeUpdatePersonalData(Number(user?.value?.id), toValue(personalDataForm))
//       successToast(toast, t('adminProfileForm.personalData'), t('adminProfileForm.dataUpdated'))
//     }
//     catch (e) {
//       console.error(e)
//       errorToast(toast, t('adminProfileForm.personalData'), e)
//     }
//   }
//
//   return {
//     personalDataForm,
//     handleUpdatePersonalData,
//   }
// }

export const useUpdatePersonalDataHandler = () => {
  const { t } = useI18n()
  const toast = useToast()
  const { successToast, errorToast } = useToastService()
  const { executeUpdatePersonalData } = useUpdatePersonalData()
  const handleUpdatePersonalData = async (userId: number, data: PersonalData) => {
    try {
      await executeUpdatePersonalData(userId, data)
      successToast(toast, t('adminProfileForm.personalData'), t('adminProfileForm.dataUpdated'))
    }
    catch (e) {
      console.error(e)
      errorToast(toast, t('adminProfileForm.personalData'), 'ERROR!')
    }
  }

  return {
    handleUpdatePersonalData,
  }
}
