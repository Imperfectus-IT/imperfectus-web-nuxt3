export const useUpdatePersonalData = () => {
  const { personalData: profileData } = useProfileState()
  const { update } = useProfileRepository()
  const { getUser } = useUserRepository()
  const executeUpdatePersonalData = async (id: number, personalData: PersonalData) => {
    const { user } = useUserState()
    await update(id, personalData)
    console.info('personalData', personalData)
    profileData.value = {
      email: personalData.email,
      username: personalData.username,
    }
    user.value = await getUser(id)
    console.info('profileData', profileData.value)
  }

  return {
    personalData: profileData,
    executeUpdatePersonalData,
  }
}
