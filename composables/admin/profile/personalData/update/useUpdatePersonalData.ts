export const useUpdatePersonalData = () => {
  const { update } = useProfileRepository()
  const { getUser } = useUserRepository()
  const executeUpdatePersonalData = async (id: number, personalData: PersonalData) => {
    const { user } = useUserState()
    await update(id, personalData)
    user.value = await getUser(id)
    console.log('USER')
  }

  return {
    executeUpdatePersonalData,
  }
}
