export const useUpdateUserLanguage = () => {
  const { updateUserLanguage } = useDomainUserRepository()
  const { domainUser } = useDomainUserState()
  const { getUser } = useDomainUserRepository()
  const executeUpdateUserLanguage = async (id: number, language: string) => {
    await updateUserLanguage(id, language)
    return domainUser.value = await getUser()
  }
  return {
    executeUpdateUserLanguage,
  }
}
