export const useUpdateUser = () => {
  const { subscribeToNewsletter, unsubscribeFromNewsletter, getUser, updatePersonalData } = useDomainUserRepository()
  const { domainUser } = useDomainUserState()
  const executeSubscribeToNewsletter = async (email: string, language: string) => {
    return await subscribeToNewsletter(email, language)
  }
  const executeUnsubscribeFromNewsletter = async (email: string, language: string) => {
    await unsubscribeFromNewsletter(email, language)
    return domainUser.value.id ? domainUser.value = await getUser() : ''
  }

  const executeUpdatePersonalData = async (id: number, personalData: PersonalData) => {
    return domainUser.value = await updatePersonalData(id, personalData)
  }

  return {
    executeSubscribeToNewsletter,
    executeUnsubscribeFromNewsletter,
    executeUpdatePersonalData,
  }
}
