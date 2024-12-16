export const useSubscribeToNewsletter = () => {
  const { subscribeToNewsletter, getUser } = useUserRepository()
  const { user } = useUserState()

  const executeSubscribeToNewsletter = async (myUser: User) => {
    await subscribeToNewsletter(myUser)
    user.value = await getUser()
  }

  return {
    executeSubscribeToNewsletter,
  }
}
