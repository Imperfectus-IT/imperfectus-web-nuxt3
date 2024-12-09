export const useUpdatePersonalData = () => {
  const { personalData: profileData } = useProfileState()
  const { update } = useProfileRepository()
  const { getUser } = useUserRepository()
  const executeUpdatePersonalData = async (id: number, personalData: PersonalData) => {
    const { user } = useUserState()
    await update(id, personalData)
    profileData.value = personalData
    user.value = await getUser(id)
  }

  return {
    personalData: profileData,
    executeUpdatePersonalData,
  }
}
