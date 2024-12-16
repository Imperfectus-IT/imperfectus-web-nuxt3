export const useUpdateProfileLanguage = () => {
  const { updateLanguage, getUser } = useUserRepository()
  const { user } = useUserState()
  const executeUpdateProfileLanguage = async (id: number, language: ProfileLanguage): Promise<void> => {
    await updateLanguage(id, language)
    user.value = await getUser()
  }

  return { executeUpdateProfileLanguage }
}
